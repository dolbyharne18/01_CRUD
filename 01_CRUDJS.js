let main = document.getElementById("submitData");
main.addEventListener("submit", async (e) => {
    console.log("i m in");
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    console.log("Name:", name);
    console.log("Email:", email);


    let data = { name, email };
    console.log("Data", data);

    try {
        const response = await fetch("https://6692545a346eeafcf46c8ece.mockapi.io/01_CRUD",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        let postedData = await response.json();
        console.log("posted Data:", postedData);

        document.getElementById('dispSubmitInfo').innerHTML = `Data Sent Successfully!`;
        // document.getElementById('FetchInfo').click();
        // main.reset();
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";



    } catch (err) {
        document.getElementById('dispSubmitInfo').innerHTML = `There Was A Problem Submiting Your Form!`

    }
})

document.getElementById('FetchInfo').addEventListener("click", async function () {
    try {
        let url = "https://6692545a346eeafcf46c8ece.mockapi.io/01_CRUD";
        let link = await fetch(url);
        console.log("LINK", link);

        let convertedData = await link.json();

        document.getElementById('dispFetchInfo').innerHTML = "";

        convertedData.forEach(element => {
            // let div = document.createElement('div');
            // let p1 = document.createElement('p');
            // let p2 = document.createElement('p');
            // let p3 = document.createElement('p');

            // p1.innerHTML = `${element.id}`;
            // p2.innerHTML = `${element.name}`;
            // p3.innerHTML = `${element.email}`;

            // div.appendChild(p1);
            // div.appendChild(p2);
            // div.appendChild(p3);

            // let mainDiv = document.getElementById('dispFetchInfo');
            // mainDiv.appendChild(div);



            let p = document.getElementById('dispFetchInfo');
            let disp = document.createElement('div');
            disp.innerHTML = `<p>ID: ${element.id}</p> <p> Name: ${element.name}</p> <p> Email: ${element.email}</p>`;
            p.appendChild(disp);

            let editBtn = document.createElement('button');
            editBtn.setAttribute("class", "btn");
            editBtn.setAttribute('id', 'idEditBtn')
            editBtn.innerHTML = 'Edit';
            p.appendChild(editBtn);

            let deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('class', 'btn');
            deleteBtn.setAttribute('id', 'idDeleteBtn');
            deleteBtn.innerHTML = 'Delete';
            p.appendChild(deleteBtn);


            deleteBtn.addEventListener('click', () => deleteData(element.id));
            editBtn.addEventListener('click', () => editData(element.id));


        });
    }
    catch (error) {
        document.getElementById('dispFetchInfo').innerHTML = `<p> There Was An Error Fetching The Data. </p>`;
    }
});

async function deleteData(dataId) {
    try {
        const response = await fetch(`https://6692545a346eeafcf46c8ece.mockapi.io/01_CRUD/${dataId}`,
            {
                method: "DELETE",
            }
        );
        const result = await response.json();
        console.log("Response Delete: ", result);
        document.getElementById('FetchInfo').click();
    } catch (error) {
        console.log("Error Deleting Data: ", error);
    }

}

async function editData(dataId) {
    const newName = prompt("Enter New Name: ");
    const newEmail = prompt("Enter New Email: ");
    if (newName && newEmail) {
        try {
            const response = await fetch(
                `https://6692545a346eeafcf46c8ece.mockapi.io/01_CRUD/${dataId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: newName,
                        email: newEmail
                    }),
                }
            );
            const result = await response.json();
            console.log("Edit Results:", result);
            document.getElementById('FetchInfo').click();
        } catch (error) {
            console.log("Error Editing Data: ", error);
        }
    }

}


