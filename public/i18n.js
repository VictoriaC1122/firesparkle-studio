// First-party, on-demand translations. No translation service or third-party requests.
(() => {
  const configNode=document.getElementById('i18n-config');
  if(!configNode) return;
  const config=JSON.parse(configNode.textContent);
  const supported=new Map(config.locales.map(locale=>[locale.code,locale]));
  const dialog=document.getElementById('language-dialog');
  const opener=document.querySelector('[data-language-open]');
  const search=document.getElementById('language-search');
  const status=dialog.querySelector('.language-load-status');
  const options=[...dialog.querySelectorAll('[data-locale]')];
  const cache=new Map();
  let current='zh-Hant', messages={}, request=0;
  const normalize=value=>String(value||'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase();
  const resolveLocale=value=>{
    const tag=String(value||'').replace(/_/g,'-').toLowerCase();
    const exact=[...supported.keys()].find(code=>code.toLowerCase()===tag);
    if(exact) return exact;
    if(tag==='zh'||tag.startsWith('zh-'))return /hant|tw|hk|mo/.test(tag)||tag==='zh'?'zh-Hant':'zh-Hans';
    const prefix=tag.split('-')[0];
    return supported.has(prefix)?prefix:({nb:'no',nn:'no',tl:'fil',iw:'he'})[prefix];
  };
  const t=en=>messages[config.keys[en]]||({'Changing language…':'正在切換語言…','This language could not be loaded. Please try again.':'暫時無法載入這個語言，請再試一次。'})[en]||en;
  const text=en=>{const el=document.createElement('span');el.innerHTML=t(en);return el.textContent;};
  const rebaseLinks=scope=>{
    for(const link of scope.querySelectorAll('a[href]')){
      const raw=link.getAttribute('href');
      if(config.base&&raw.startsWith('/')&&!raw.startsWith('//')&&!raw.startsWith(config.base+'/'))link.setAttribute('href',config.base+raw);
      const url=new URL(link.href,location.href);
      if(url.origin!==location.origin||!(/\/$|\/index\.html$|\/404\.html$/.test(url.pathname)))continue;
      if(current==='zh-Hant')url.searchParams.delete('lang');else url.searchParams.set('lang',current);
      link.setAttribute('href',url.pathname+url.search+url.hash);
    }
  };
  const translate=scope=>{
    for(const el of scope.querySelectorAll('[data-i18n]')){
      const value=messages[el.dataset.i18n];
      if(value!==undefined)el.innerHTML=el.hasAttribute('data-i18n-count')?value.replaceAll('{count}',el.dataset.i18nCount):value;
    }
    for(const [attr,key,selector] of [['placeholder','i18nPlaceholder','[data-i18n-placeholder]'],['aria-label','i18nLabel','[data-i18n-label]'],['alt','i18nAlt','[data-i18n-alt]']]){
      for(const el of scope.querySelectorAll(selector)){
        const value=messages[el.dataset[key]];
        if(value!==undefined){const tmp=document.createElement('span');tmp.innerHTML=value+(attr==='alt'&&el.dataset.i18nAltSuffix?' — '+messages[el.dataset.i18nAltSuffix]:'');el.setAttribute(attr,tmp.textContent);}
      }
    }
    rebaseLinks(scope);
  };
  function setPolicyVersion(version){
    for(const el of document.querySelectorAll('[data-policy-version]'))el.hidden=el.dataset.policyVersion!==version;
    for(const button of document.querySelectorAll('[data-policy-switch]'))button.setAttribute('aria-pressed',String(button.dataset.policySwitch===version));
  }
  function apply(locale,payload){
    current=locale.code;messages=payload.messages;
    document.documentElement.lang=current;
    document.documentElement.dir=locale.dir;
    document.documentElement.dataset.script=locale.script;
    translate(document);
    document.querySelector('[data-current-language]').textContent=({'zh-Hant':'繁中','zh-Hans':'简中'})[current]||current.toUpperCase();
    opener.setAttribute('aria-label',text('Language')+' · '+locale.native);
    opener.title=locale.native;
    for(const button of options)button.setAttribute('aria-current',String(button.dataset.locale===current));
    setPolicyVersion(current.startsWith('zh')?'zh-Hant':'en');
    const title=document.querySelector('main h1')?.innerText?.trim().replace(/\s+/g,' ');
    if(title){document.title=title+' | FireSparkle.Studio';document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);}
    const lead=document.querySelector('.dawn-lead,.app-intro-copy .lead,body:not([data-nav]) .page-heading .lead');
    if(lead&&!document.querySelector('.policy-body')){
      for(const el of document.querySelectorAll('meta[name="description"],meta[property="og:description"]'))el.content=lead.textContent.trim();
    }
    document.dispatchEvent(new CustomEvent('site:languagechange',{detail:{locale:current,dir:locale.dir}}));
  }
  async function changeLanguage(code,{remember=false,updateURL=false}={}){
    const locale=supported.get(code);if(!locale)return false;
    const serial=++request;
    status.textContent=text('Changing language…');dialog.setAttribute('aria-busy','true');
    try{
      let payload=cache.get(code);
      if(!payload){
        const url=new URL(`${config.base||''}/i18n/${locale.file}`,location.origin);
        const response=await fetch(url,{credentials:'same-origin'});
        if(!response.ok)throw new Error('Language resource unavailable');
        payload=await response.json();
        if(payload.locale!==code||!payload.messages||Object.values(config.keys).some(key=>typeof payload.messages[key]!=='string'))throw new Error('Incomplete language resource');
        cache.set(code,payload);
      }
      if(serial!==request)return false;
      apply(locale,payload);
      if(remember)try{localStorage.setItem('fs-lang',code);}catch{}
      if(updateURL){const url=new URL(location.href);if(code==='zh-Hant')url.searchParams.delete('lang');else url.searchParams.set('lang',code);history.replaceState(null,'',url.pathname+url.search+url.hash);}
      status.textContent='';return true;
    }catch(error){
      if(serial===request){status.textContent=text('This language could not be loaded. Please try again.');document.dispatchEvent(new CustomEvent('site:languageerror',{detail:{locale:code}}));}
      return false;
    }finally{if(serial===request)dialog.removeAttribute('aria-busy');}
  }
  window.fsI18n={t,text,translate,changeLanguage,markup:en=>`<span data-i18n="${config.keys[en]}">${t(en)}</span>`,get locale(){return current;}};
  const filter=()=>{
    const query=normalize(search.value.trim());let shown=0;
    for(const button of options){button.hidden=!normalize(button.dataset.languageSearch).includes(query);if(!button.hidden)shown++;}
    dialog.querySelector('[data-no-languages]').hidden=shown>0;
  };
  search.addEventListener('input',filter);search.addEventListener('search',filter);
  search.addEventListener('keydown',event=>{if(event.key==='Enter'){const matches=options.filter(button=>!button.hidden);if(matches.length===1){event.preventDefault();matches[0].click();}}});
  if(typeof dialog.showModal==='function'){
    opener.hidden=false;
    opener.addEventListener('click',()=>{search.value='';filter();status.textContent='';dialog.showModal();search.focus();});
  }
  dialog.querySelector('[data-language-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',async event=>{
    const button=event.target.closest('[data-locale]');
    if(button&&await changeLanguage(button.dataset.locale,{remember:true,updateURL:true}))dialog.close();
    if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}
  });
  for(const button of document.querySelectorAll('[data-policy-switch]'))button.addEventListener('click',()=>setPolicyVersion(button.dataset.policySwitch));
  const param=resolveLocale(new URL(location.href).searchParams.get('lang'));
  let stored;try{stored=resolveLocale(localStorage.getItem('fs-lang'));}catch{}
  const detected=(navigator.languages||[navigator.language]).map(resolveLocale).find(code=>supported.has(code));
  const initial=param||stored||detected||'en';
  changeLanguage(initial,{updateURL:!!param});
})();
