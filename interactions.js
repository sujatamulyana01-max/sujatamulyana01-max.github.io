const chart = document.querySelector('.plot');
if (chart) {
  const reading = document.querySelector('#reading');
  function showSelectedMonth() {
    const month = chart.querySelector('input:checked');
    reading.textContent = month.value + ' · Rp ' + month.dataset.sales + 'M';
  }
  chart.addEventListener('change', showSelectedMonth);
  window.addEventListener('pageshow', showSelectedMonth);
}

const navigation = [...document.querySelectorAll('nav a[href^="#"]')];
if (navigation.length) {
  const sections = navigation.map(link => document.querySelector(link.hash));
  let scheduled = false;
  function highlightSection() {
    const offset = document.querySelector('.mast').offsetHeight + 30;
    const active = sections.find(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= offset && bounds.bottom > offset;
    });
    navigation.forEach(link => {
      if (active && link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  function scheduleHighlight() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(highlightSection);
  }
  window.addEventListener('scroll', scheduleHighlight, {passive:true});
  window.addEventListener('resize', scheduleHighlight);
  highlightSection();
}
