import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator, FlatList, ImageBackground, Pressable, StyleSheet, Text, View,
} from 'react-native';

type Agendamento = {
  id_agendamento: number;
  data: string;
  horario?: string;
  nome_cliente: string;
  nome_profissional: string;
};

export default function AgendamentosScreen() {
  const navigation = useNavigation();
  const [agendamentos, setAgendamentos] = useState<Agendamento[] | null>(null);

  useEffect(() => {
    const getAgendamentos = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/agendamento');
        const data = await response.json();
        setAgendamentos(data.agendamento);
        console.error('users:', data.agendamento);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    getAgendamentos();
  }, []);

  return (
    <ImageBackground style={styles.container} resizeMode="cover">
      <Text style={styles.title}>📅 Agendamentos</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Data</Text>
          <Text style={styles.headerCell}>Hora</Text>
          <Text style={styles.headerCell}>Cliente</Text>
          <Text style={styles.headerCell}>Profissional</Text>
        </View>

        {agendamentos === null ? (
          <ActivityIndicator size="large" color="#007acc" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={agendamentos}
            keyExtractor={(item, index) =>
              item?.id_agendamento?.toString() ?? `agendamento-${index}`
            }
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.data}</Text>
                <Text style={styles.cell}>{item.agenda.horario}</Text>
                <Text style={styles.cell}>{item.usuario.nome}</Text>
                <Text style={styles.cell}>{item.agenda.usuario.nome}</Text>
              </View>
            )}
          />
        )}
      </View>
 <Link href="CadastrarAgenda" asChild>
  <Pressable style={styles.dentalButton}>
    <MaterialCommunityIcons name="calendar-plus" size={18} color="#6bb2b4" style={{ marginRight: 6 }} />
    <Text style={styles.dentalButtonText}>Agendar</Text>
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
  voltar: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
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
  table: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 60, // espaço pro footer
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
