import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';

const servicos = [
  { label: 'Novo Cliente', route: '/cadastrarCliente', icon: 'account-plus-outline' },
  { label: 'Nova Agenda', route: '/CadastrarAgenda', icon: 'calendar-plus' },
  { label: 'Agendar Consulta', route: '/criarAgendamento', icon: 'calendar-edit' },
  { label: 'Serviços', route: '/Servicos', icon: 'tooth-outline' },
  { label: 'Ver Agendas', route: '/agendas', icon: 'calendar-month' },
  { label: 'Agendamentos', route: '/Agendamentos', icon: 'clipboard-text-outline' },
  { label: 'Profissionais', route: '/profissionais', icon: 'account-tie-outline' },
  { label: 'Clientes', route: '/clientes', icon: 'account-group-outline' },
  { label: 'Usuários', route: '/Usuarios', icon: 'account-cog-outline' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>DENTINHO FELIZ</Text>
        <View style={styles.titleUnderline} />

        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Quem somos?</Text>
          <Text style={styles.aboutText}>
            O aplicativo Dentinho Feliz foi desenvolvido especialmente para a comunidade de odontologia. Aqui você sempre vai encontrar diversas informações, e um lugar especial para compartilhar conhecimentos.
          </Text>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Ações</Text>
        </View>

        <View style={styles.servicosContainer}>
          {servicos.map((item, index) => (
            <Link key={index} href={item.route} asChild>
              <Pressable style={styles.serviceCard}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={34}
                  color="#ffffff"
                  style={{ marginBottom: 6 }}
                />
                <Text style={styles.serviceText}>{item.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={styles.footer}>
        <Pressable onPress={() => router.push('/')} style={styles.footerButton}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#6bb2b4" />
          <Text style={styles.footerText}>Início</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6bb2b4',
    textAlign: 'center',
    marginBottom: 6,
  },
  titleUnderline: {
    width: 180,
    height: 4,
    backgroundColor: '#6bb2b4',
    borderRadius: 10,
    marginBottom: 24,
  },
  aboutCard: {
    backgroundColor: '#6bb2b4',
    borderRadius: 18,
    padding: 24,
    width: '95%',
    alignItems: 'center',
    marginBottom: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  aboutText: {
    color: '#e6fafa',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitleContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6bb2b4',
    marginBottom: 4,
  },
  servicosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    rowGap: 20,
  },
  serviceCard: {
    width: 100,
    height: 110,
    backgroundColor: '#6bb2b4',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceText: {
    fontSize: 13,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
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
