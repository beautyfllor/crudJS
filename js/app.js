'use strict'

import {openModal, closeModal} from './modal.js'
import {readCustomers, createCustomers, deleteCustomer} from './customers.js'

const createRow = (customer) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${customer.nome}</td>
        <td>${customer.email}</td>
        <td>${customer.celular}</td>
        <td>${customer.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${customer.id}">editar</button>
            <button type="button" class="button red" id="excluir-${customer.id}">excluir</button>
        </td>
    `
    return row
}

const updateTable = async () => {

    const customersContainer = document.getElementById('customers-container')

    //Lê a API e armazena o resultado em uma variável
    const customers = await readCustomers()

    //Preenche, adiciona uma linha na tabela com as informações vindas da API
    const rows = customers.map(createRow)
    customersContainer.replaceChildren(...rows)
}

const saveCustomer = async () => {
    //Cria um json com as informações do cliente
    const customer = {
        "id": "",
        "nome": document.getElementById("nome").value,
        "email": document.getElementById("email").value,
        "celular": document.getElementById("celular").value,
        "cidade": document.getElementById("cidade").value
    }

    //Envia o json para o Servidor API
    await createCustomers(customer)

    //Fechar modal
    closeModal()

    //Atualizar 
    updateTable()
}

const actionCustomer = async () => {
    if(event.target.type == "button") {
        //split() -> Separa uma string de acordo com o caracter colocado em um array
        const [action, codigo] = event.target.id.split('-')
        if(action == 'editar') {
            //Função para editar o cliente
        } else if(action == 'excluir') {
            await deleteCustomer(codigo)
            updateTable()
        }
        
    }
}

updateTable()

//Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveCustomer)
document.getElementById('customers-container').addEventListener('click', actionCustomer)