/* ========================================
   ATS1071 Tutorial Slides — Timer
   Click to start, click again to reset
   ======================================== */

document.querySelectorAll('.timer').forEach(function(el) {
  var totalSeconds = parseInt(el.getAttribute('data-minutes')) * 60;
  var remaining = totalSeconds;
  var interval = null;
  var state = 'idle'; // idle | running | expired

  function fmt(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  el.textContent = fmt(remaining);

  el.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

    if (state === 'idle') {
      state = 'running';
      el.classList.add('running');
      interval = setInterval(function() {
        remaining--;
        el.textContent = fmt(remaining);
        if (remaining <= 120 && remaining > 0) {
          el.classList.remove('running');
          el.classList.add('warning');
        }
        if (remaining <= 0) {
          clearInterval(interval);
          el.textContent = '0:00';
          el.classList.remove('running', 'warning');
          el.classList.add('expired');
          state = 'expired';
        }
      }, 1000);
    } else {
      // Reset
      clearInterval(interval);
      remaining = totalSeconds;
      el.textContent = fmt(remaining);
      el.classList.remove('running', 'warning', 'expired');
      state = 'idle';
    }
  });
});
