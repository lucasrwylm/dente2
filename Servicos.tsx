import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Servico = {
  id_servico: number;
  nome_servico: string;
  valor:number;
};

export default function ServicosScreen() {
  const [servicos, setServicos] = useState<Servico[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getServicos = async () => {
      try {
        const response = await fetch('http://localhost/agendamentos/servicos');
        const data = await response.json();
        console.log('Resposta da API de serviços:', data);

        if (Array.isArray(data.servicos)) {
          setServicos(data.servicos);
        } else {
          console.warn('Formato inesperado:', data);
          setServicos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        setServicos([]);
      }
    };

    getServicos();
  }, []);

  return (
    <>
      <ImageBackground style={styles.container} resizeMode="cover">
        <Text style={styles.title}>🦷 Serviços</Text>

        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.headerCell}>Tipo</Text>
            <Text style={styles.headerCell}>Valor</Text>
          </View>

          {servicos === null ? (
            <ActivityIndicator size="large" color="#007acc" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={servicos}
              keyExtractor={(item, index) =>
                item?.id_servico?.toString() ?? `servico-${index}`
              }
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.nome_servico}</Text>
                  <Text style={styles.cell}>{item.valor}</Text>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>

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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6bb2b4',
    justifyContent: 'center',
    paddingBottom: 80, 
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
