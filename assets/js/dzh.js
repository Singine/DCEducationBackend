// bachelor

$(function() {
  // 初始化多选下拉框（目标院校和目标专业）
  $('#select_bachelor_to_school').select2({
    placeholder: "请选择目标院校（可多选）",
    allowClear: true
  });

  $('#select_bachelor_to_major').select2({
    placeholder: "请选择目标专业（可多选）",
    allowClear: true
  });
});

// A-Level：勾选时显示并启用四个下拉框，取消时隐藏并清空
document.getElementById('checkbox_bachelor_alevel').addEventListener('change', function() {
  const container = document.getElementById('bachelor_alevel_scores_container');
  const selects = container.querySelectorAll('select');

  if (this.checked) {
    container.style.display = 'flex';  // 显示为 flex，保持水平排列
    selects.forEach(sel => sel.disabled = false);
  } else {
    container.style.display = 'none';
    selects.forEach(sel => {
      sel.disabled = true;
      sel.value = '';
    });
  }
});

// IB
document.getElementById('checkbox_bachelor_ib').addEventListener('change', function() {
  const input = document.getElementById('input_bachelor_score_ib');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// AP
document.getElementById('checkbox_bachelor_ap').addEventListener('change', function() {
  const input = document.getElementById('input_bachelor_score_ap');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 雅思 IELTS
document.getElementById('checkbox_bachelor_ielts').addEventListener('change', function() {
  const container = document.getElementById('bachelor_ielts_score_container');
  const inputs = container.querySelectorAll('input');

  if (this.checked) {
    container.style.display = 'flex';
    inputs.forEach(inp => inp.disabled = false);
  } else {
    container.style.display = 'none';
    inputs.forEach(inp => {
      inp.disabled = true;
      inp.value = '';
    });
  }
});

// 托福 TOEFL
document.getElementById('checkbox_bachelor_toefl').addEventListener('change', function() {
  const container = document.getElementById('bachelor_toefl_score_container');
  const inputs = container.querySelectorAll('input');

  if (this.checked) {
    container.style.display = 'flex';
    inputs.forEach(inp => inp.disabled = false);
  } else {
    container.style.display = 'none';
    inputs.forEach(inp => {
      inp.disabled = true;
      inp.value = '';
    });
  }
});

// PTE
document.getElementById('checkbox_bachelor_pte').addEventListener('change', function() {
  const container = document.getElementById('bachelor_pte_score_container');
  const inputs = container.querySelectorAll('input');

  if (this.checked) {
    container.style.display = 'flex';
    inputs.forEach(inp => inp.disabled = false);
  } else {
    container.style.display = 'none';
    inputs.forEach(inp => {
      inp.disabled = true;
      inp.value = '';
    });
  }
});

// 多邻国 Duolingo
document.getElementById('checkbox_bachelor_duolingo').addEventListener('change', function() {
  const input = document.getElementById('score_duolingo');
  if (this.checked) {
    input.disabled = false;
    // 如果你希望勾选后才显示，可以取消注释下面这行
    // input.style.display = 'block';
  } else {
    input.disabled = true;
    input.value = '';
    // input.style.display = 'none';
  }
});

// 活动
document.getElementById('checkbox_bachelor_activity').addEventListener('change', function() {
  const input = document.getElementById('input_bachelor_activity');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 科研/论文
document.getElementById('checkbox_bachelor_research').addEventListener('change', function() {
  const input = document.getElementById('input_bachelor_research');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 获奖
document.getElementById('checkbox_bachelor_award').addEventListener('change', function() {
  const input = document.getElementById('input_bachelor_award');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});















// master


$(function() {
  // 初始化多选下拉框（目标院校和目标专业）
  $('#select_master_to_school').select2({
    placeholder: "请选择目标院校（可多选）",
    allowClear: true
  });

  $('#select_master_to_major').select2({
    placeholder: "请选择目标专业（可多选）",
    allowClear: true
  });
});


// 雅思 IELTS
document.getElementById('checkbox_master_ielts').addEventListener('change', function() {
  const container = document.getElementById('master_ielts_score_container');
  const inputs = container.querySelectorAll('input');

  if (this.checked) {
    container.style.display = 'flex';
    inputs.forEach(inp => inp.disabled = false);
  } else {
    container.style.display = 'none';
    inputs.forEach(inp => {
      inp.disabled = true;
      inp.value = '';
    });
  }
});

// 托福 TOEFL
document.getElementById('checkbox_master_toefl').addEventListener('change', function() {
  const container = document.getElementById('master_toefl_score_container');
  const inputs = container.querySelectorAll('input');

  if (this.checked) {
    container.style.display = 'flex';
    inputs.forEach(inp => inp.disabled = false);
  } else {
    container.style.display = 'none';
    inputs.forEach(inp => {
      inp.disabled = true;
      inp.value = '';
    });
  }
});

// PTE
document.getElementById('checkbox_master_pte').addEventListener('change', function() {
  const container = document.getElementById('master_pte_score_container');
  const inputs = container.querySelectorAll('input');

  if (this.checked) {
    container.style.display = 'flex';
    inputs.forEach(inp => inp.disabled = false);
  } else {
    container.style.display = 'none';
    inputs.forEach(inp => {
      inp.disabled = true;
      inp.value = '';
    });
  }
});

// 多邻国 Duolingo
document.getElementById('checkbox_master_duolingo').addEventListener('change', function() {
  const input = document.getElementById('score_duolingo');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 活动
document.getElementById('checkbox_master_activity').addEventListener('change', function() {
  const input = document.getElementById('input_master_activity');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 科研/论文
document.getElementById('checkbox_master_research').addEventListener('change', function() {
  const input = document.getElementById('input_master_research');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 获奖
document.getElementById('checkbox_master_award').addEventListener('change', function() {
  const input = document.getElementById('input_master_award');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});


// 国外专业相关
document.getElementById('checkbox_master_work_abroad_related').addEventListener('change', function() {
  const input = document.getElementById('input_master_work_abroad_related');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 国外专业不相关
document.getElementById('checkbox_master_work_abroad_unrelated').addEventListener('change', function() {
  const input = document.getElementById('input_master_work_abroad_unrelated');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 国内专业相关
document.getElementById('checkbox_master_work_domestic_related').addEventListener('change', function() {
  const input = document.getElementById('input_master_work_domestic_related');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 国内专业不相关
document.getElementById('checkbox_master_work_domestic_unrelated').addEventListener('change', function() {
  const input = document.getElementById('input_master_work_domestic_unrelated');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});