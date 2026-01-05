// ==============================
// tags.js（融合版）
// - 保留你原来的：select2 初始化 + DataTable + delete 行删除
// - 新增：#countrySelect -> #universitySelect 的 select2 ajax 联动
// ==============================

// 你原来的初始化（保留）
$(function() {
  $('.select-country').select2();
  $('.select-university').select2();
  $('#majorsList').DataTable();

  // ✅ 新增：国家 -> 学校联动初始化（如果页面存在这两个 id 才启用）
  initCountryUniversitySelect2();
});

/* Formatting function for row details - modify as you need */
function format ( d ) {
  // `d` is the original data object for the row
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
    '<tr>'+
      '<td>Full name:</td>'+
      '<td>'+d.name+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Extension number:</td>'+
      '<td>'+d.extn+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Extra info:</td>'+
      '<td>And any further details here (images etc)...</td>'+
    '</tr>'+
  '</table>';
}

// Delete btn js（保留）
document.addEventListener('DOMContentLoaded', (event) => {
  const handleDelete = (event) => {
    const deleteButton = event.target;
    if (deleteButton.classList.contains('delete-btn')) {
      const row = deleteButton.closest('tr');
      row.remove();
    }
  };

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDelete);
  });
});


// ==============================
// ✅ 新增：国家 -> 学校 select2 联动
// 依赖：页面有 #countrySelect 和 #universitySelect
// 后端接口：
// - GET /api/v1/countries/options?q=&page=&size=
// - GET /api/v1/universities/options-u-name-cn?country_id=&q=&page=&size=
// ==============================
function initCountryUniversitySelect2() {
  const $country = $("#countrySelect");
  const $university = $("#universitySelect");

  // 页面没有这两个 select 就不做联动（避免影响你其它页面）
  if ($country.length === 0 || $university.length === 0) return;

  const API = ""; // 同域部署用相对路径；如跨域可填 "http://db.dceducation.com.cn"

  function normalizePaged(resp) {
    // 兼容：{code,message,data:{page,size,total,items}}
    const data = resp && resp.data ? resp.data : resp;
    const items = (data && data.items) ? data.items : [];
    const total = (data && typeof data.total === "number") ? data.total : items.length;
    return { items, total };
  }

  function safeDestroySelect2($el) {
    if ($el.hasClass("select2-hidden-accessible")) {
      $el.select2("destroy");
    }
  }

  function initUniversitySelect(countryId) {
    // 重置学校下拉
    safeDestroySelect2($university);
    $university.empty().trigger("change");

    if (!countryId) {
      $university.prop("disabled", true);
      return;
    }

    $university.prop("disabled", false);

    $university.select2({
      width: "100%",
      placeholder: "请选择学校",
      allowClear: true,
      ajax: {
        url: API + "/api/v1/universities/options-u-name-cn",
        dataType: "json",
        delay: 250,
        data: function (params) {
          return {
            country_id: countryId,
            q: params.term || "",
            page: params.page || 1,
            size: 20
          };
        },
        processResults: function (resp, params) {
          params.page = params.page || 1;
          const { items, total } = normalizePaged(resp);

          const results = items.map(it => ({
            id: it.id,
            text: it.name_cn
          }));

          const hasMore = (params.page * 20) < total;

          return {
            results,
            pagination: { more: hasMore }
          };
        },
        cache: true
      }
    });
  }

  // 国家下拉：用接口驱动（会清空你原来写死的 option，统一用 country_id 作为 value）
  safeDestroySelect2($country);
  $country.empty();

  $country.select2({
    width: "100%",
    placeholder: "请选择国家",
    allowClear: true,
    ajax: {
      url: API + "/api/v1/countries/options",
      dataType: "json",
      delay: 150,
      data: function (params) {
        return {
          q: params.term || "",
          page: params.page || 1,
          size: 50
        };
      },
      processResults: function (resp, params) {
        params.page = params.page || 1;
        const { items, total } = normalizePaged(resp);

        // countries/options items 需要至少有：{id, name_cn}
        const results = items.map(it => ({
          id: it.id,
          text: it.name_cn
        }));

        const hasMore = (params.page * 50) < total;

        return {
          results,
          pagination: { more: hasMore }
        };
      },
      cache: true
    }
  });

  // 选择国家后：刷新学校下拉
  $country.on("change", function () {
    const countryId = $(this).val();
    initUniversitySelect(countryId);
  });

  // 初始：学校禁用
  initUniversitySelect(null);
}
