const portfolio = {
  skills: [
    {name:"Python", modules:["Pandas","NumPy","Matplotlib"]},
    {name:"SQL", modules:[]},
    {name:"Excel", modules:[]},
    {name:"Power BI", modules:[]},
    {name:"EDA", modules:[]},
    {name:"Prompt Engineering", modules:[]}
  ],

  experience: [
    {
      company:"i3 Sangam Lifestyle Solutions Private Limited",
      start:"1 Year 5 Months",
      end:"Designs Engineer",
      work:"Worked as a Designs Engineer with experience in AutoCAD, Excel, PowerPoint and Word. Prepared ADE layouts, split-wise layouts, elevations, schematics, Engraving and other technical documentation including Product Approval documents, Technical Submittals and Quote Variations.",
      letter:""
    }
  ],

  achievements: [
    {
      title:"Data Analysts Tool Box",
      type:"Certification • Udemy • 21 May 2026",
      url:"",
      pdf:""
    },
    {
      title:"Prompt Engineering with ChatGPT Master Class",
      type:"Certification • Udemy • 05 June 2026",
      url:"",
      pdf:""
    },
    {
      title:"LinkedIn",
      type:"Professional Profile",
      url:"https://www.linkedin.com/in/udaykiran9573/",
      pdf:""
    }
  ],

  projects: [
    {
      title:"Customer Delinquency Risk Analysis & AI Collections Strategy",
      description:"Conducted Exploratory Data Analysis (EDA) using GenAI tools to assess data quality, identify risk indicators, and structure insights for predictive modelling. Proposed and justified a no-code predictive modelling framework to assess customer delinquency risk, leveraging GenAI for model logic design and evaluation criteria.",
      image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title:"E-Commerce Sales Analysis",
      description:"Analysed 9,994 e-commerce transaction records using Python to evaluate sales performance, profitability, customer behaviour, and regional trends. Performed data cleaning, preprocessing, and exploratory data analysis (EDA) using Pandas to ensure data quality and uncover business insights. Conducted customer, product, and regional performance analysis to identify key revenue drivers and sales patterns, and generated actionable insights for profitability improvement, customer retention, and sales growth.",
      image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title:"Chips Sales Analysis",
      description:"Analysed 250K records using Python to evaluate sales performance, profitability, customer behaviour, and regional trends. Performed data cleaning, preprocessing, and exploratory data analysis (EDA) using Pandas to ensure data quality and uncover business insights. Generated actionable insights from pre-trial and actual sales.",
      image:"https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1000&q=80"
    }
  ]
};


const $ = s => document.querySelector(s);

let currentSection = null;
let returnScrollY = 0;


window.addEventListener("load", () => {
  $("#year").textContent = new Date().getFullYear();
  initVisitorCounter();
});


function enterPortfolio(){
  $("#loader").classList.add("hidden");
  $("#app").classList.remove("hidden");
  window.scrollTo({top:0,behavior:"auto"});
}


function scrollToSections(){
  $("#sectionNav").scrollIntoView({behavior:"smooth"});
}


function openSection(section){
  if (!currentSection) {
    returnScrollY = window.scrollY;
  }

  currentSection = section;

  $("#home").style.display = "none";

  $("#detailView").classList.add("active");

  $("#detailView").setAttribute("aria-hidden","false");

  renderSection(section);

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}


function goHome(){
  $("#detailView").classList.remove("active");

  $("#detailView").setAttribute("aria-hidden","true");

  $("#home").style.display = "block";

  currentSection = null;

  requestAnimationFrame(() => {
    window.scrollTo({
      top:returnScrollY,
      behavior:"smooth"
    });
  });
}


function openContactModal(){
  $("#contactModal").classList.add("active");

  $("#contactModal").setAttribute("aria-hidden","false");

  document.body.style.overflow="hidden";
}


function closeContactModal(){
  $("#contactModal").classList.remove("active");

  $("#contactModal").setAttribute("aria-hidden","true");

  document.body.style.overflow="";
}


$("#contactModal").addEventListener("click",e=>{
  if(e.target.id==="contactModal"){
    closeContactModal();
  }
});


document.addEventListener("keydown",e=>{
  if(
    e.key==="Escape" &&
    $("#contactModal").classList.contains("active")
  ){
    closeContactModal();
  }
});


function renderSection(section){

  const titles = {
    skills:"Skills",
    experience:"Experience",
    achievements:"Certifications & Profiles",
    projects:"Projects"
  };


  const subtitles = {
    skills:"A visual overview of my analytical and technical knowledge.",
    experience:"My professional journey and technical responsibilities.",
    achievements:"Certifications and professional profiles.",
    projects:"Selected analytical projects and business insights."
  };


  $("#detailContent").innerHTML = `
    <p class="eyebrow">PORTFOLIO SECTION</p>

    <h1 class="detail-title">
      ${titles[section]}
    </h1>

    <p class="detail-subtitle">
      ${subtitles[section]}
    </p>

    <div id="sectionBody"></div>

    <div class="action-row">
      ${Object.keys(titles)
        .filter(k=>k!==section)
        .map(k=>`
          <button
            class="link-btn secondary"
            onclick="openSection('${k}')">

            <i class="fa-solid ${iconFor(k)}"></i>

            ${titles[k]}

          </button>
        `)
        .join("")}
    </div>
  `;


  const body = $("#sectionBody");


  if(section==="skills"){
    renderSkills(body);
  }


  if(section==="experience"){
    renderExperience(body);
  }


  if(section==="achievements"){
    renderAchievements(body);
  }


  if(section==="projects"){
    renderProjects(body);
  }
}


function iconFor(k){

  return {
    skills:"fa-code",
    experience:"fa-briefcase",
    achievements:"fa-trophy",
    projects:"fa-diagram-project"
  }[k];

}


function renderSkills(el){

  if(!portfolio.skills.length){

    el.innerHTML='<div class="empty">No skills added.</div>';

    return;
  }


  el.innerHTML = portfolio.skills.map(s=>`

    <div class="detail-panel skill-card">

      <h3>
        ${escapeHtml(s.name)}
      </h3>

      ${
        s.modules.length
        ?
        `<div class="tags">
          ${s.modules
            .map(m=>`
              <span class="tag">
                ${escapeHtml(m)}
              </span>
            `)
            .join("")}
        </div>`

        :

        `<p class="skill-note">
          Listed as a core skill in my resume.
        </p>`
      }

    </div>

  `).join("");

}


function renderExperience(el){

  if(!portfolio.experience.length){

    el.innerHTML='<div class="empty">No experience added.</div>';

    return;
  }


  el.innerHTML=`

    <div class="timeline">

      ${portfolio.experience.map(e=>`

        <div class="timeline-item">

          <div class="detail-panel">

            <h3>
              ${escapeHtml(e.company)}
            </h3>

            <p class="eyebrow">
              ${escapeHtml(e.start)}
              •
              ${escapeHtml(e.end)}
            </p>

            <p style="color:var(--muted);line-height:1.8">
              ${escapeHtml(e.work)}
            </p>

          </div>

        </div>

      `).join("")}

    </div>

  `;

}


function renderAchievements(el){

  if(!portfolio.achievements.length){

    el.innerHTML='<div class="empty">No achievements added.</div>';

    return;
  }


  el.innerHTML=portfolio.achievements.map(a=>`

    <div class="detail-panel">

      <p class="eyebrow">
        ${escapeHtml(a.type)}
      </p>

      <h3>
        ${escapeHtml(a.title)}
      </h3>

      <div class="action-row">

        ${
          a.url
          ?
          `
          <a
            class="link-btn"
            href="${safeUrl(a.url)}"
            target="_blank"
            rel="noopener">

            <i class="fa-solid fa-arrow-up-right-from-square"></i>

            Open Profile

          </a>
          `
          :
          ""
        }

      </div>

    </div>

  `).join("");

}


function renderProjects(el){

  if(!portfolio.projects.length){

    el.innerHTML='<div class="empty">No projects added.</div>';

    return;
  }


  el.innerHTML=`

    <div class="project-grid">

      ${portfolio.projects.map(p=>`

        <article class="project-card">

          ${
            p.image
            ?
            `
            <img
              src="${safeUrl(p.image)}"
              alt="${escapeHtml(p.title)}">
            `
            :
            ""
          }

          <div class="project-body">

            <h3>
              ${escapeHtml(p.title)}
            </h3>

            <p>
              ${escapeHtml(p.description)}
            </p>

          </div>

        </article>

      `).join("")}

    </div>

  `;

}


function initVisitorCounter(){

  const key="ukPortfolioVisits";

  let count=parseInt(
    localStorage.getItem(key)||"0",
    10
  )+1;

  localStorage.setItem(key,count);

  $("#visitorCount").textContent=count;

}


/*
===========================================================
SECURITY / HTML HELPERS
===========================================================
*/

function escapeHtml(value=""){

  return String(value).replace(
    /[&<>"']/g,

    m=>({

      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      "\"":"&quot;",
      "'":"&#039;"

    }[m])

  );

}


function safeUrl(value=""){

  try{

    const u = new URL(
      value,
      location.href
    );


    return [
      "http:",
      "https:",
      "data:",
      "blob:"
    ].includes(u.protocol)

      ? u.href

      : "#";


  }catch{

    return "#";

  }

}