
function setupContactForm(){
 const form=document.querySelector('#contactForm'); if(!form)return;
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.querySelector('#formSuccess'); const er=document.querySelector('#formError');
  n.style.display='none';er.style.display='none';
  if(!form.checkValidity()){er.textContent='Please complete all required fields correctly.';er.style.display='block';return}
  n.textContent='Thank you. Your enquiry has been recorded in this demo website. Connect the form to Supabase/email before production.';n.style.display='block';form.reset();
 });
}
function setupLogin(){
 const form=document.querySelector('#loginForm'); if(!form)return;
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const role=document.querySelector('#role').value;
  const out=document.querySelector('#loginMessage');
  out.style.display='block';
  out.innerHTML='Demo login selected: <strong>'+role.replace('_',' ')+'</strong>. Connect Supabase Auth for real accounts and permissions.';
 });
}
document.addEventListener('DOMContentLoaded',()=>{setupContactForm();setupLogin()});
