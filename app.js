const container = document.getElementById("aiContainer");
const loadAI = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then((res) => res.json())
        .then((AIs) => showAI(AIs.data.tools));
};


let visibleAIs = 6;

function showAI(AIs) {
    console.log(AIs)
    
    const aiContainer = document.getElementById('aiContainer')
    aiContainer.innerHTML = '';
    for (let i = 0; i < visibleAIs && i < AIs.length; i++) {
        
        const AI = AIs[i];
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
                        <button data-bs-toggle="modal" data-bs-target="#AImodal" onclick="modal('${AI.id}')" class="details-btn mt-4"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
              </div>
            </div>
          </div>
            `;
        aiContainer.appendChild(aiDiv);
    }

    if (visibleAIs < AIs.length) {
        const showMoreButton = document.createElement('button');
        showMoreButton.innerText = 'Show more';
        showMoreButton.classList.add('show-more-btn', 'btn', 'btn-danger', 'p-3' ,'justify-content-center', 'align-items-center', 'mx-auto');
        showMoreButton.addEventListener('click', () => {
            visibleAIs += 6;
            showAI(AIs);
            if (visibleAIs >= AIs.length) {
                showMoreButton.remove();
            }
        });
        document.getElementById('showAll-btn').appendChild(showMoreButton)
    }
}

function modal(id){

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`

    fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data));

    const modalDiv = document.getElementById('modal')
    modalDiv.innerHTML = `
    <div class="modal fade" id="AImodal" tabindex="-1" aria-labelledby="AImodalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AImodalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    `;


        
}



loadAI();

