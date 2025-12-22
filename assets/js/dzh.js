$(function() {
  $('.bachelorSelect-country').select2();
});


// A-Level：勾选时显示并启用四个下拉框，取消时隐藏并清空
document.getElementById('checkbox_alevel').addEventListener('change', function() {
  const container = document.getElementById('alevel_scores_container');
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

document.getElementById('checkbox_ib').addEventListener('change', function() {
  const scoreInput = document.getElementById('score_ib');
  if (this.checked) {
    scoreInput.disabled = false;
  } else {
    scoreInput.disabled = true;
    scoreInput.value = '';
  }
});

document.getElementById('checkbox_ap').addEventListener('change', function() {
  const scoreInput = document.getElementById('score_ap');
  if (this.checked) {
    scoreInput.disabled = false;
  } else {
    scoreInput.disabled = true;
    scoreInput.value = '';
  }
});

// 雅思
document.getElementById('checkbox_ielts').addEventListener('change', function() {
  const container = document.getElementById('ielts_score_container');
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

// 托福
document.getElementById('checkbox_toefl').addEventListener('change', function() {
  const container = document.getElementById('toefl_score_container');
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

// 多邻国
document.getElementById('checkbox_duolingo').addEventListener('change', function() {
  const input = document.getElementById('score_duolingo');
  if (this.checked) {
    // input.style.display = 'block';
    input.disabled = false;
  } else {
    // input.style.display = 'none';
    input.disabled = true;
    input.value = '';
  }
});

document.getElementById('checkbox_activity').addEventListener('change', function() {
  const input = document.getElementById('score_activity');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 科研/论文
document.getElementById('checkbox_research').addEventListener('change', function() {
  const input = document.getElementById('score_research');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 获奖
document.getElementById('checkbox_award').addEventListener('change', function() {
  const input = document.getElementById('score_award');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

// 实习
document.getElementById('checkbox_internship').addEventListener('change', function() {
  const input = document.getElementById('score_internship');
  if (this.checked) {
    input.disabled = false;
  } else {
    input.disabled = true;
    input.value = '';
  }
});

