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
                        <button type="button" data-bs-toggle="modal" data-bs-target="#AImodal" onclick="modal('${AI.id}')" class="details-btn mt-4"><i class="fa-solid fa-arrow-right"></i></button>
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

const modal = async id =>{

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`


    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)

    const modalDiv = document.getElementById('modal')
    modalDiv.innerHTML = `
    <div class="modal fade container-fluid" id="AImodal" tabindex="-1" aria-aria-labelledby="AImodalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg container-fluid">
        <div class="modal-content container-fluid">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="AImodalLabel">${data.data.tool_name}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="d-flex">
                <div class="modal-body my-auto mod-left">
                    <div>
                        <h6> ${data.data.description} </h6>
                    </div>
                    <div class="d-flex">
                        <div class="p-1 bg-light m-2 p-2">
                            <p>
                                ${data.data.pricing[0].price}
                            </p>
                            <p>
                                ${data.data.pricing[0].plan}
                            </p>
                        </div>
                        <div class="p-1 bg-light m-2 p-2">
                            <p>
                                ${data.data.pricing[1].price}
                            </p>
                            <p>
                                ${data.data.pricing[1].plan}
                            </p>
                        </div>
                        <div class="p-1 bg-light m-2 p-2">
                            <p>
                                ${data.data.pricing[2].price}
                            </p>
                            <p>
                                ${data.data.pricing[2].plan}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>Features</h3>
                            <ul>
                                <li>${data.data.features[1].feature_name}</li>
                                <li>${data.data.features[2].feature_name}</li>
                                <li>${data.data.features[3].feature_name}</li>
                            </ul>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <img class="img-fluid m-2" src="${data.data.image_link[0]}" alt="">
                    <h5> ${data.data.input_output_examples[0].output}</h5>
                    <p>${data.data.input_output_examples[0].output}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    `;


        
}



loadAI();