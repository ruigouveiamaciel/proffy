import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import { useHistory } from "react-router-dom"

import "./styles.css"
import Input from "../../components/Input";

import warningIcon from "../../assets/images/icons/warning.svg"
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";
import api from "../../services/api";

type ScheduleFields = "week_day" | "from" | "to"

function TeacherForm() {
    const history = useHistory()

    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [bio, setBio] = useState("")

    const [subject, setSubject] = useState("")
    const [cost, setCost] = useState("")

    const [ scheduleItems, setScheduleItems ] = useState([
        { week_day: "0", from: "", to: "" }
    ])

    function addScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: "0",
                from: "",
                to: ""
            }
        ]);

        scheduleItems.push()
    }

    function updateScheduleItem(index: number, field: ScheduleFields, value: string) {
        const updatedScheduleItems = [ ...scheduleItems ]
        updatedScheduleItems[index][field] = value;

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post("classes", {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems.map(item => {
                return { ...item, week_day: Number(item.week_day) }
            })
        }).then(() => {
            alert("Cadastro realizado com sucesso")

            history.push("/")
        }).catch(() => {
            alert("Problema no cadastro")
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que voce quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => {
                                setAvatar(e.target.value)
                            }}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => {
                                setWhatsapp(e.target.value)
                            }}
                        />
                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => {
                                setBio(e.target.value)
                            }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value)
                            }}
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
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => {
                                setCost(e.target.value)
                            }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((item, index) => {
                            return (
                            <div key={index} className="schedule-item">
                                <Select
                                    name="week_day"
                                    label="Dia da semana"
                                    value={item.week_day}
                                    onChange={e => {
                                        updateScheduleItem(index, "week_day", e.target.value)
                                    }}
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
                                <Input
                                    name="from"
                                    label="Das"
                                    type="time"
                                    value={item.from}
                                    onChange={e => {
                                        updateScheduleItem(index, "from", e.target.value)
                                    }}
                                />
                                <Input
                                    name="to"
                                    label="Até"
                                    type="time"
                                    value={item.to}
                                    onChange={e => {
                                        updateScheduleItem(index, "to", e.target.value)
                                    }}
                                />
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
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;
