import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import PageHeader from "../../components/PageHeader"
import styles from "./styles"
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons"
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage"

function TeacherList() {
    const [ teachers, setTeacher ] = useState([]);
    const [ favorites, setFavorites ] = useState<number[]>([]);
    const [ isFiltersVisible, setIsFiltersVisible ] = useState(false);
    const [ subject, setSubject ] = useState("")
    const [ week_day, setWeekDay ] = useState("")
    const [ time, setTime ] = useState("")

    function loadFavorites() {
        AsyncStorage.getItem("favorites").then(response => {
            if (response) {
                setFavorites(JSON.parse(response).map((teacher: Teacher) => {
                    return teacher.id;
                }))
            }
        })
    }

    function handleToggleFilters() {
        setIsFiltersVisible(!isFiltersVisible)
    }


    async function handleFiltersSubmit() {
        loadFavorites()

        const response = await api.get("classes", {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeacher(response.data)

        console.log(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilters}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
                >
                { isFiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        placeholderTextColor="#c1bccc"
                        value={subject}
                        onChangeText={setSubject}
                        style={styles.input}
                        placeholder="Qual a matéria?"
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                value={week_day}
                                onChangeText={setWeekDay}
                                placeholder="Qual o dia?"
                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                value={time}
                                onChangeText={setTime}
                                placeholder="Qual horário"
                            />
                        </View>
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>) }
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />
                })}

            </ScrollView>
        </View>
    )
}

export default TeacherList;