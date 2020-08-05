import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";

import "./styles.css"
import Input from "../../components/Input";

import warningIcon from "../../assets/images/icons/warning.svg"
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

function TeacherForm() {
    const [ scheduleItems, setScheduleItems ] = useState([
        { week_day: 0, from: "8:00", to: "16:00" },
        { week_day: 0, from: "8:00", to: "16:00" }
    ])

    function addScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: "",
                to: ""
            }
        ]);

        scheduleItems.push()
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que voce quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input name="name" label="Nome completo" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="WhatsApp" />
                    <TextArea name="bio" label="Biografia"></TextArea>
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select
                        name="subject"
                        label="Matéria"
                        options={[
                            { value: "Artes", label: "Artes" },
                            { value: "Biologia", label: "Biologia" },
                            { value: "Ciências", label: "Ciências" },
                            { value: "Educação Física", label: "Educação Física" },
                            { value: "Geografia", label: "Geografia" },
                            { value: "Historia", label: "Historia" },
                            { value: "Matemática", label: "Matemática" },
                            { value: "Português", label: "Português" },
                            { value: "Química", label: "Química" }
                        ]}
                    />
                    <Input name="cost" label="Custo da sua hora por aula" />
                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addScheduleItem}>
                            + Novo horário
                        </button>
                    </legend>

                    {scheduleItems.map(item => {
                        return (
                        <div key={item.week_day} className="schedule-item">
                            <Select
                                name="week_day"
                                label="Dia da semana"
                                options={[
                                    { value: "0", label: "Domingo" },
                                    { value: "1", label: "Segunda-feira" },
                                    { value: "2", label: "Terça-feira" },
                                    { value: "3", label: "Quarta-feira" },
                                    { value: "4", label: "Quinta-feira" },
                                    { value: "5", label: "Sexta-feira" },
                                    { value: "6", label: "Sábado" }
                                ]}
                            />
                            <Input name="from" label="Das" type="time" />
                            <Input name="to" label="Até" type="time" />
                        </div>
                        )
                    })}


                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br />
                        Preencha todos os dados.
                    </p>
                    <button type="button">
                        Salvar cadastro
                    </button>
                </footer>
            </main>
        </div>
    )
}

export default TeacherForm;
