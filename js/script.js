function createElement(tagName, attributes, textContent="") {
  const element= document.createElement(tagName);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
    
    }
    element.textContent = textContent;
  return element;
} 

const API_URL = "https://66dbd4fe47d749b72aca1317.mockapi.io/todos";


async function fetchandDisplay(element,filtertext="") {
    try {
        element.innerHTML=""
      const res = await fetch(API_URL);
        const todos = await res.json();
         let sumincome = 0;
         let sumexpense = 0;

      todos.filter((todo)=>filtertext==""||todo.amounttype==filtertext).forEach((todo) => {
        const todorow = element.appendChild(
          createElement("tr", { class: "border-b-2" })
        );
        todorow.appendChild(
          createElement("td", { class: "px-4 py-2" }, todo.id)
        );
        todorow.appendChild(
          createElement("td", { class: "px-4 py-2" }, todo.Description)
        );
        todorow.appendChild(
          createElement("td", { class: "px-4 py-2" }, todo.amount)
        );
        todorow.appendChild(
          createElement("td", { class: "px-4 py-2" }, todo.amounttype)
          );
          const actiondiv = todorow.appendChild(createElement("td",
              {
                  class:"p-4 flex items-center gap-2"
              }
          ))
       const delbtn=   actiondiv.appendChild(createElement("button",
              {
                 class:"text-red-400 hover:text-red-700" 
              },
              "Delete"
       ))
       const editbtn=   actiondiv.appendChild(createElement("button",
              {
                 class:"text-yellow-500 hover:text-blue-500" 
              },
              "Edit"
       ))
         
          
         


          if (todo.amounttype === "Income") {
              
            sumincome += parseFloat(todo.amount);
              document.getElementById("income").textContent = sumincome;
              todorow.classList.add("text-green-500");
              todorow.classList.add("border-green-500");
              todorow.classList.add("bg-green-50");
              
          } else if (todo.amounttype === "Expense") {
            sumexpense += parseFloat(todo.amount);
              document.getElementById("Expense").textContent = sumexpense;
              todorow.classList.add("text-red-500");
              todorow.classList.add("border-red-500");
              todorow.classList.add("bg-red-50");
          }
          document.getElementById("Balance").textContent =
            sumincome - sumexpense;
         delbtn.addEventListener("click", async () => {
            const res = await fetch(API_URL + "/" + todo.id, {
              method: "DELETE",
            });
            todorow.remove();
            if (todo.amounttype === "Income") {
              sumincome -= parseFloat(todo.amount);
            } else if (todo.amounttype === "Expense") {
              sumexpense -= parseFloat(todo.amount);
            }
            updatetotal(sumincome, sumexpense);
              
         });
           
          

      });
    } catch (err) {
      alert("error");
    }
    updatetotal(sumincome, sumexpense);
    function updatetotal(sumincome, sumexpense) {
      document.getElementById("income").textContent = sumincome;
      document.getElementById("Expense").textContent = sumexpense;
      document.getElementById("Balance").textContent = sumincome - sumexpense;
    }

}



window.onload = () => {
    const nav = document.body.appendChild(createElement("nav",
        {
            class:"flex justify-around items-center shadow-lg h-24"
        }
    ))
    nav.appendChild(createElement("h1",

        {
            class:"text-4xl font-bold text-center "
        },
        "Income Expense Calculator"
    ))


  

    const inputcont = document.body.appendChild(createElement("div",
        {
            class:"flex flex-col items-center m-16 p-8 gap-4 bg-blue-100 h-auto rounded-lg"
        }
    ))

    

    const inputdiv = inputcont.appendChild(createElement("div",
        {
            class:"flex justify-center  gap-8 "
        }
    ))

   const moneydesc=inputdiv.appendChild(createElement("input",
        {
            type:"text",
            name:"todoname",
            placeholder:"Description",
            class:"border-2 border-gray-300 p-2 focus:border-blue-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-300  shadow-lg"
        }
   ))
    
    const amountdiv = inputdiv.appendChild(createElement("div",
        {
            class:"flex items-center gap-2"
        }
    ))

   const amountrs=amountdiv.appendChild(
      createElement("input", {
        type: "number",
        class:
          "border-2 border-gray-300 p-2 focus:border-blue-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-300  shadow-lg",
        placeholder: "Amount",
      })
    );

   



    amountdiv.appendChild(createElement("p",
        {
             class:"text-2xl"
        },
        "$"
    ))
    

     const typeselect = inputdiv.appendChild(
       createElement("select", {
         name: "type",
         id: "type",
         class:
           "border-2 border-gray-300 p-2 focus:border-blue-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-300 hover:cursor-pointer",
       })
     );
     typeselect.appendChild(
       createElement(
         "option",
         {
           class: "hover:cursor-not-allowed",
           value: "",
           disabled: true,
           selected: true,
         },
         "Choose type"
       )
     );

     typeselect.appendChild(
       createElement(
         "option",
         {
           class: "hover:cursor-pointer",
           value: "Income",
         },
         "Income"
       )
     );
     typeselect.appendChild(
       createElement(
         "option",
         {
           class: "hover:cursor-pointer",
           value: "Expense",
         },
         "Expense"
       )
    );
    
    const addbtn = inputcont.appendChild(
      createElement("input", {
        type: "button",
        value: "Add",
        class:
          "border-2 bg-blue-400 hover:bg-blue-600 active:bg-blue-500 px-4 py-2 rounded-lg hover:ring-blue-600 hover:ring-2 text-white text-xl hover:cursor-pointer",
      })
    );

      const displaydiv = document.body.appendChild(
        createElement("div", {
          class: "flex justify-around m-16 p-8 gap-4 bg-blue-50  h-auto rounded-lg",
        })
      );

      const displaybox = displaydiv.appendChild(
        createElement("div", {
          class: "bg-white  px-16 py-4 ",
        })
      );
      displaybox.appendChild(
        createElement(
          "p",
          {
            class: "text-xl font-bold  ",
          },
          "Total Income"
        )
    );

    const displayboxamount = displaybox.appendChild(createElement("div", { class:"flex gap-2"}))

      displayboxamount.appendChild(
        createElement(
          "p",
          {
            class: "text-lg text-green-600",
          },
          "$"
        )
      );
     const totalinc= displayboxamount.appendChild(
        createElement(
          "span",
          {
              class: "text-lg text-green-600",
              id:"income"
          },
         Number()
        )
    );
    
      const displaybox1 = displaydiv.appendChild(
        createElement("div", {
          class: "bg-white px-16 py-4",
        })
      );
      displaybox1.appendChild(
        createElement(
          "p",
          {
            class: "text-xl font-bold",
          },
          "Total Expense"
        )
    );
     const displaybox1amount = displaybox1.appendChild(
       createElement("div", { class: "flex gap-2" })
     );
    displaybox1amount.appendChild(
      createElement(
        "p",
        {
          class: "text-lg text-red-600",
        },
        "$"
      )
    );


      const totalexp=displaybox1amount.appendChild(
        createElement(
          "span",
          {
              class: "text-lg text-red-600",
              id:"Expense"
          },
          Number()
        )
      );
      const displaybox2 = displaydiv.appendChild(
        createElement("div", {
          class: "bg-white  px-16 py-4",
        })
      );
      displaybox2.appendChild(
        createElement(
          "p",
          {
            class: "text-xl font-bold",
          },
          "Total Balance"
        )
    );
     const displaybox2amount = displaybox2.appendChild(
       createElement("div", { class: "flex gap-2" })
     );
    displaybox2amount.appendChild(
      createElement(
        "p",
        {
          class: "text-lg text-blue-600",
        },
        "$"
      )
    );
     const totalbal= displaybox2amount.appendChild(
        createElement(
          "span",
          {
              class: "text-lg text-blue-600",
              id:"Balance"
          },
          Number()
        )
    );

    const filterdiv = document.body.appendChild(createElement("div",
        {
            class:"md:flex md:flex-row md:flex-nowrap justify-center gap-2 grid grid-rows-2 grid-cols-2 m-2"
        }))
    const filterselect = filterdiv.appendChild(
      createElement("select", {
        name: "filter",
        id: "filter",
        class:
          "border-2 border-gray-300 p-2 focus:border-blue-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-300 hover:cursor-pointer",
      })
    );
    filterselect.appendChild(createElement("option",
        {
            class: "hover:cursor-pointer",
            value: "",
            selected:true
        },
        "All"
    ))
    filterselect.appendChild(createElement("option",
        {
            class: "hover:cursor-pointer",
            value: "Income"
        },
        "Income"
    ))
    filterselect.appendChild(createElement("option",
        {
            class: "hover:cursor-pointer",
            value: "Expense"
        },
        "Expense"
    ))
    filterselect.addEventListener("change", ()=> {
        fetchandDisplay(document.getElementById("todos"),filterselect.value)
    })

    const tablecont = document.body.appendChild(createElement("div",
        {
            class:" shadow-lg  mx-16 "
        }
    ))

    const table = tablecont.appendChild(createElement("table",
        {
            class:"w-full text-left"
        }
    ))

    const thead = table.appendChild(createElement("thead",
        {
            class:"bg-gray-200"
        }
    ))
    const theadrow = thead.appendChild(createElement("tr",))

    theadrow.appendChild(createElement("th",
        {
            class:"p-4"
        },
        "Id"
    ))

    theadrow.appendChild(createElement("th",
        {
            class:"p-4"
        },
        "Description"
    ))
    theadrow.appendChild(createElement("th",
        {
            class:"p-4"
        },
        "Amount"
    ))
    theadrow.appendChild(createElement("th",
        {
            class:"p-4"
        },
        "Amount Type"
    ))
    theadrow.appendChild(createElement("th",
        {
            class:"p-4"
        },
        "Actions"
    ))


    const tbody = table.appendChild(createElement("tbody", { id: "todos" }))
    fetchandDisplay(tbody)


    addbtn.addEventListener("click",async function addamount() {
        if (moneydesc.value == "" || typeselect.value == "" || amountrs.value == "") {
            alert("Find all the details")
            return

        }
        const newamount = {
          Description: moneydesc.value,
          amount: amountrs.value,
          amounttype: typeselect.value,
        };
        try{
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newamount)
        })
               
        
            fetchandDisplay(document.getElementById("todos"))
             
            
            const data = await res.json();
           
      

             
            
        } catch (err) {
            console.warn(err)
        } finally {
            moneydesc.value = ""
            amountrs.value = ""
            typeselect.value=""
        }
        
    })

   fetchandSum(tbody);
    
   
    
    

}