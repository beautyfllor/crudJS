'use strict'

import {openModal, closeModal} from './modal.js'
import {readCustomers, createCustomers, deleteCustomer, updateCustomer} from './customers.js'

const createRow = ({nome, email, celular, cidade, id}) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${celular}</td>
        <td>${cidade}</td>
        <td>
            <button type="button" class="button green" onClick="editCustomer(${id})">editar</button>
            <button type="button" class="button red" onClick="delCustomer(${id})">excluir</button>
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

const isEdit = () => document.getElementById('nome').hasAttribute('data-id')

const saveCustomer = async () => {

    const form = document.getElementById('modal-form')

    //Cria um json com as informações do cliente
    const customer = {
        // "id": "",
        "nome": document.getElementById("nome").value,
        "email": document.getElementById("email").value,
        "celular": document.getElementById("celular").value,
        "cidade": document.getElementById("cidade").value,
        "foto": document.getElementById("modal-image").src
    }

    if(form.reportValidity()) {
        if(isEdit()) {
            customer.id = document.getElementById('nome').dataset.id
            await updateCustomer(customer)
        } else {
            await createCustomers(customer)
        }

        closeModal()

        updateTable()
    }
}

const fillForm = (customer) => {
    document.getElementById('nome').value = customer.nome
    document.getElementById('email').value = customer.email
    document.getElementById('celular').value = customer.celular
    document.getElementById('cidade').value = customer.cidade
    document.getElementById('nome').dataset.id = customer.id
    document.getElementById('modal-image').src = customer.foto
    /*setAttribute -> É mais geral
    document.getElementById('nome').setAttribute('data-id', customer.id)*/
}

globalThis.editCustomer = async (id) => {
    //Armazenar as informações do cliente em um avariável
    const customer = await readCustomers(id)

    //Preencher o formulário com as informações
    fillForm(customer)

    //Abrir a modal no estado de edição
    openModal()
}

globalThis.delCustomer = async (id) => {
    await deleteCustomer(id)
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

const maskCelular = ({target}) => {

    let text = target.value

    text = text.replace(/[^0-9]/g, '')
    text = text.replace(/(.{2})(.{5})(.{4})/, '($1) $2-$3')
    text = text.replace(/(.{15})(.*)/, '$1')
    // text = text.replace(/(.{7})(.)/, '$1-$2')

    target.value = text
}

updateTable()

//Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveCustomer)
document.getElementById('customers-container').addEventListener('click', actionCustomer)
document.getElementById('celular').addEventListener('input', maskCelular)