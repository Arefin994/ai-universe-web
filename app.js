const container = document.getElementById("aiContainer");
const loadAI = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then((res) => res.json())
        .then((AIs) => showAI(AIs.data.tools));

    turnOnLoader(true);
};


let visibleAIs = 6;

const turnOnLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }

    else {
        loaderSection.classList.add('d-none');
    }
}

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
                        <div class="d-flex">
                        <i class="pe-2 fa-sharp fa-regular fa-calendar-days"></i>
                        <h6>${AI.published_in}</h6>
                        </div>
                    </div>
                     <div> 
                        <button type="button" data-bs-toggle="modal" data-bs-target="#AImodal" onclick="modal('${AI.id}')" class="details-btn mt-4 "><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
              </div>
            </div>
          </div>
            `;
        aiContainer.appendChild(aiDiv);
    }

    if (visibleAIs < AIs.length) {
        turnOnLoader(true);
        const showMoreButton = document.createElement('button');
        showMoreButton.innerText = 'Show more';
        showMoreButton.classList.add('show-more-btn', 'btn', 'btn-danger', 'p-3', 'justify-content-center', 'align-items-center', 'mx-auto');
        showMoreButton.addEventListener('click', () => {
            visibleAIs += 6;
            showAI(AIs);
            if (visibleAIs >= AIs.length) {
                showMoreButton.remove();
            }
        });
        document.getElementById('showAll-btn').appendChild(showMoreButton)
    }
    turnOnLoader();
}

const modal = async id => {

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`

    console.log(id)

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)



    const modalDiv = document.getElementById('modal-body')
    if (id != 12) {
        modalDiv.innerHTML = `
    <div class="d-md-flex">
        <div class="modal-body my-auto mod-left w-50 w-sm-100 w-sm-100">
            <div>
                <h5> ${data.data.description} </h5>
            </div>
            <div class="d-md-flex">
                <div class="text-success p-1 bg-white m-2 p-2 fw-bold">
                    <p>
                        ${data.data.pricing[0].price}
                    </p>
                    <p>
                        ${data.data.pricing[0].plan}
                    </p>
                </div>
                <div class="text-warning p-1 bg-white m-2 p-2 fw-bold">
                    <p>
                        ${data.data.pricing[1].price}
                    </p>
                    <p>
                        ${data.data.pricing[1].plan}
                    </p>
                </div>
                <div class="text-danger p-1 bg-white m-2 p-2 fw-bold">
                    <p>
                        ${data.data.pricing[2].price}
                    </p>
                    <p>
                        ${data.data.pricing[2].plan}
                    </p>
                </div>
            </div>
            <div class="d-flex">
                <div class="mx-2">
                    <h3>Integrations</h3>
                    <ul>
                        <li>${data.data.integrations[0]}</li>
                        <li>${data.data.integrations[1]}</li>
                        <li>${data.data.integrations[2]}</li>
                    </ul>
                </div>
                <div class="mx-2">
                    <h3>Features</h3>
                <ul>
                    <li>${data.data.features[1].feature_name}</li>
                    <li>${data.data.features[2].feature_name}</li>
                    <li>${data.data.features[3].feature_name}</li>
                </ul>
            </div>
           </div>
        </div>
        <div class="modal-body w-50 w-sm-100 my-auto">
            <div>
                <div>
                    <img class="img-fluid m-2" src="${data.data.image_link[0]}" alt="">
                </div>
                <div>
                    <h6 class="fixed-top-right">${data.data.accuracy.score*100+"% Accuracy"}</h6>
                </div>
            </div>
            <h5 class="m-2"> ${data.data.input_output_examples[0].input}</h5>
            <p class="m-2">${data.data.input_output_examples[0].output}</p>
         </div>
    </div>
    `;

    }
    else {
        modalDiv.innerHTML = `<h3 class=:"text-center">No Info on this found<h3>`
    }

}



loadAI();