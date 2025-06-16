import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Agenda = {
  id_agenda: number;
  id_usuario: number;
  dia_da_semana: number;
  horario: string;
};

type User = {
  id: number;
  nome: string;
  nome_grupo: string;
};

export default function ListaAgendas() {
  const [users, setUsers] = useState<User[]>([]);
  const [agendas, setAgenda] = useState<Agenda[] | null>(null);

  useEffect(() => {
    const getAgendas = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/agenda');
        const data = await response.json();
        setAgenda(data.agenda || []);
      } catch (error) {
        console.error('Erro ao buscar agendas:', error);
        setAgenda([]);
      }
    };
    getAgendas();
  }, []);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/usuarios');
        const data = await response.json();
        setUsers(data.usuarios || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    getUsuarios();
  }, []);

  const dia_semana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  const getNomeUsuario = (id: number) => {
    const usuario = users.find(u => u.id === id);
    return usuario ? usuario.nome : 'Desconhecido';
  };

  return (
    <ImageBackground style={styles.container} resizeMode="cover">
      <Text style={styles.title}>📋 Lista de Agendas</Text>

  


      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Profissional</Text>
          <Text style={styles.headerCell}>Dia</Text>
          <Text style={styles.headerCell}>Horário</Text>
        </View>

        {agendas === null ? (
          <ActivityIndicator size="large" color="#007acc" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={agendas}
            keyExtractor={(item) => item.id_agenda.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>

                <Text style={styles.cell}>{item.usuario.nome}</Text>
                <Text style={styles.cell}>{dia_semana[item.dia_da_semana]}</Text>
                <Text style={styles.cell}>{item.horario}</Text>
              </View>
            )}
          />
        )}
      </View>
        <Link href="CadastrarAgenda" asChild>
  <Pressable style={styles.dentalButton}>
    <MaterialCommunityIcons name="calendar-plus" size={18} color="#6bb2b4" style={{ marginRight: 6 }} />
    <Text style={styles.dentalButtonText}>Criar Agenda</Text>
  </Pressable>
</Link>
      
      <View style={styles.footer}>
        <Link href="/" asChild>
          <Pressable style={styles.homeButton}>
           <MaterialCommunityIcons name="home-outline" size={28} color="#6bb2b4" />
            <Text style={styles.footerText}>Início</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6bb2b4',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  link: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  table: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 60, // espaço para o footer
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#e0f7fa',
    borderBottomWidth: 2,
    borderColor: '#007acc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#007acc',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    color: '#34495e',
    textAlign: 'center',
  },
  footer: {
     position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#ffffff',
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButton: {
  alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
 fontSize: 12,
    color: '#6bb2b4',
    marginTop: 2,
  },
  dentalButton: {
  position: 'absolute',
  top: 20, 
  right: 10,
  flexDirection: 'row',
  alignSelf: 'center',
  alignItems: 'center',
backgroundColor:'rgb(255, 255, 255)',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 10,
  marginBottom: 16,
  elevation: 2,
},
dentalButtonText: {
  color: '#6bb2b4',
  fontSize: 16,
  fontWeight: 'bold',
  alignItems:"center"
},

});
