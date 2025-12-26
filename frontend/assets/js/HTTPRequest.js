function validateAddUser() {
  // 错误容器
  const usernameError = $("#add_usernameError");
  const emailError = $("#add_emailError");
  const passwordError = $("#add_passwordError");
  const confirmPasswordError = $("#add_confirm_passwordError");
  const roleError = $("#add_roleError");

  // 清空所有错误
  usernameError.text("");
  emailError.text("");
  passwordError.text("");
  confirmPasswordError.text("");
  roleError.text("");

  // 取值
  const username = ($("#add_username").val() || "").trim();
  const email = ($("#add_email").val() || "").trim();
  const password = $("#add_password").val() || "";
  const confirmPassword = $("#add_confirm_password").val() || "";
  const role = ($("#add_role").val() || "user").trim() || "user";

  // 正则（你可按需调整）
  const usernameRegex = /^[A-Za-z0-9_]{3,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordLengthRegex = /^.{8,72}$/;
  const passwordHasLetter = /[A-Za-z]/;
  const passwordHasNumber = /[0-9]/;

  let hasError = false;

  // username
  if (!usernameRegex.test(username)) {
    usernameError.text("用户名需 3-50 位，只能包含字母/数字/下划线。");
    hasError = true;
  }

  // email
  if (!emailRegex.test(email)) {
    emailError.text("邮箱格式不正确。");
    hasError = true;
  }

  // password
  if (!passwordLengthRegex.test(password)) {
    passwordError.text("密码长度需 8-72 位。");
    hasError = true;
  } else {
    // 可选：强度要求
    if (
      !passwordHasLetter.test(password) ||
      !passwordHasNumber.test(password)
    ) {
      passwordError.text("密码需至少包含 1 个字母和 1 个数字。");
      hasError = true;
    }
  }

  // confirm password
  if (confirmPassword !== password) {
    confirmPasswordError.text("两次输入的密码不一致。");
    hasError = true;
  }

  // role
  if (!["user", "admin", "superadmin"].includes(role)) {
    roleError.text("权限选择不合法。");
    hasError = true;
  }

  if (hasError) return { ok: false };

  return {
    ok: true,
    values: { username, email, password, role },
  };
}

// ====== 提交逻辑 ======
async function submitAddUser() {
  const result = validateAddUser();
  if (!result.ok) return; // ❌ 校验不通过：直接停止

  const { username, email, password, role } = result.values;

  // ✅ 校验通过：组 JSON（后端会把 password -> bcrypt hash -> password_hash）
  const payload = {
    username,
    email,
    password,
    role,
    permission_level: role === "superadmin" ? 100 : role === "admin" ? 50 : 10,
    status: "active",
  };

  // ✅ 存储 JSON（你可以按需改 key 或改成 sessionStorage）
  try {
    localStorage.setItem("add_user_payload", JSON.stringify(payload));
  } catch (e) {
    // 本地存储失败不阻塞提交
    console.warn("localStorage 保存失败：", e);
  }

  const $btn = $("#add_submit");
  const oldText = $btn.text();
  $btn.prop("disabled", true).text("Submitting...");
  console.log(payload);
  try {
    const resp = await fetch("/api/v1/users/upsert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.log(data.error || "提交失败");
      return;
    }

    console.log(`成功：${data.action || "ok"}`);

    // 可选：清空密码框
    $("#add_password").val("");
    $("#add_confirm_password").val("");
  } catch (err) {
    console.error(err);
    console.log("网络错误或服务器不可达");
  } finally {
    $btn.prop("disabled", false).text(oldText);
  }
}
// ====== 绑定事件（只绑定一次） ======
$(function () {
  $("#add_submit")
    .off("click.addUser") // 防止重复绑定
    .on("click.addUser", function (event) {
      event.preventDefault();
      submitAddUser();
    });
});
