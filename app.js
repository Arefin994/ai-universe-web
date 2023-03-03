const conainter = document.getElementById("aiContainer");
const loadAI = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then((res) => res.json())
        .then((AIs) => showAI(AIs.data.tools));
};

function showAI(AIs) {
    console.log(AIs)

    const aiContainer = document.getElementById('aiContainer')
    for (const AI of AIs) {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('ai');
        console.log(AI);
        aiDiv.innerHTML = `
            <div class="col">
            <div class="card">
              <img src="${AI.image}"  class="card-img-top img-fluid p-3 rounded" alt="...">
              <div class="card-body">
                <h5 class="card-title">
                    Features
                </h5>
                <ul class="card-text">
                    <li type="1">${AI.features[0]}</li>
                    <li type="1">${AI.features[1]}</li>
                    <li type="1">${AI.features[2]}</li>
                </ul>
                <hr>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3>${AI.name}</h3>
                        <h6>${AI.published_in}</h6>
                    </div>
                     <div> 
                        <button class="details-btn mt-4"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
              </div>
            </div>
          </div>
            `;
        aiContainer.appendChild(aiDiv);
    }
}

loadAI();
