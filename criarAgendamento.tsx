import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type User = {
    id_usuario: number;
    id_grupo: number;
    data_de_nascimento: string;
    nome: string;
    nome_grupo: string;
    email: string;
};

type Servico = {
    id_servico: number;
    nome_servico: string;
    valor: number;
};

const dia_semana = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
];

export function MountarAgendamentos({ agendamentos, id_usuario, id_servico, data }) {
    const router = useRouter();

    const reservar = async (id_agenda: number) => {
        const dados = { id_agenda, id_usuario, id_servico, data };
        try {
            const response = await fetch('http://localhost/agendamentos/createAgendamento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            if (response.ok) {
                router.push('/Agendamentos');
            } else {
                const errorText = await response.text();
                console.error('Erro ao salvar:', errorText);
                Alert.alert('Erro', 'Não foi possível salvar os dados.');
            }
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível enviar os dados.');
        }
    };

    return (
        <FlatList
            data={agendamentos || []}
            keyExtractor={(item) => item.id_agenda.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.cardText}>Profissional: {item.usuario?.nome_usuario}</Text>
                    <Text style={styles.cardText}>Dia da semana: {dia_semana[item.dia_da_semana]}</Text>
                    <Text style={styles.cardText}>Horário: {item.horario}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => reservar(item.id_agenda)}>
                        <Text style={styles.buttonText}>Reservar</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}

export default function FormularioAgendamento() {
    const [users, setUsers] = useState<User[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const router = useRouter();

    const [form, setForm] = useState({
        data: '',
        cliente: '',
        servico: '',
    });

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const response = await fetch('http://localhost/agendamentos/cliente');
                const data = await response.json();
                setUsers(data.usuarios || []);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                setUsers([]);
            }
        };
        getUsuarios();
    }, []);

    useEffect(() => {
        const getServicos = async () => {
            try {
                const response = await fetch('http://localhost/agendamentos/servicos');
                const data = await response.json();
                setServicos(data.servicos || []);
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
                setServicos([]);
            }
        };
        getServicos();
    }, []);

    const handleSubmit = async () => {
        const dados = { ...form };
        try {
            const response = await fetch('http://localhost/agendamentos/preparar-agendamento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            if (response.ok) {
                const data = await response.json();
                setAgendamentos(data.agendamentos || []);
            } else {
                const errorText = await response.text();
                console.error('Erro ao salvar:', errorText);
                Alert.alert('Erro', 'Não foi possível salvar os dados.');
            }
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro', 'Não foi possível enviar os dados.');
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.form}>
                    <Text style={styles.title}>Novo Agendamento</Text>

                    <Text style={styles.label}>Data do Agendamento</Text>
                    <TextInput
                        style={styles.input}
                        value={form.data}
                        onChangeText={(text) => setForm({ ...form, data: text })}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#aaa"
                    />

                    <Text style={styles.label}>Cliente</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={form.cliente}
                            onValueChange={(itemValue) => setForm({ ...form, cliente: itemValue })}
                            style={styles.picker}
                        >
                            <Picker.Item label="Selecione um cliente" value="" />
                            {users.map((cliente) => (
                                <Picker.Item key={cliente.id_usuario} label={cliente.nome} value={cliente.id_usuario} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Serviço</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={form.servico}
                            onValueChange={(itemValue) => setForm({ ...form, servico: itemValue })}
                            style={styles.picker}
                        >
                            <Picker.Item label="Selecione um serviço" value="" />
                            {servicos.map((servico) => (
                                <Picker.Item key={servico.id_servico} label={servico.nome_servico} value={servico.id_servico} />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>

                    {agendamentos.length > 0 && (
                        <>
                            <Text style={[styles.label, { marginTop: 20 }]}>Horários disponíveis:</Text>
                            <MountarAgendamentos
                                agendamentos={agendamentos}
                                id_usuario={form.cliente}
                                id_servico={form.servico}
                                data={form.data}
                            />
                        </>
                    )}

                    {agendamentos.length === 0 && (
                        <Text style={[styles.label, { marginTop: 20 }]}>
                            Nenhum profissional com agenda disponível na data selecionada.
                        </Text>
                    )}
                </View>
            </ScrollView>

            {/* Footer Fixo */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/')}>
                    <MaterialCommunityIcons name="home-outline" size={28} color="#6bb2b4" />
                    <Text style={styles.footerText}>Início</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 100, // espaço para o footer
        backgroundColor: '#6bb2b4',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        padding: 20,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#007acc',
        textAlign: 'center',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#b3d9ff',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#b3d9ff',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        backgroundColor: '#00cc99',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    cardText: {
        color: '#333',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#6bb2b4',
        marginTop: 2,
    },
});
