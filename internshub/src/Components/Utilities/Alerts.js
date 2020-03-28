/* eslint-disable */

const hideAlert = () => {
  const el = document.querySelector(".alerts");
  if (el) el.parentElement.removeChild(el);
};
// type is 'success' or 'error'
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alerts alerts--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 1500);
};
