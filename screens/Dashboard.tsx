import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const API_URL = 'https://coral-app-bo9qh.ondigitalocean.app/api/v1/analytics/emotions';

// ==========================================================
// COLORES POR EMOCIÓN
// ==========================================================

const coloresEmocion: { [key: string]: string } = {
  'Satisfacción': '#9bd0bb',
  'Frustración': '#e76f51',
  'Desmotivación': '#6cb4ee',
  'Inseguridad': '#f4a261',
  'Impacto': '#fbbf24',
  'Neutral': '#a78bfa',
  'Rechazo': '#ef4444',
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(155, 208, 187, ${opacity})`,
  labelColor: () => '#333',
  barPercentage: 0.6,
  decimalCount: 0,
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: '#e8e8e8',
  },
};

// ==========================================================
// COMPONENTES
// ==========================================================

function KPICard({ titulo, valor, color }: { titulo: string; valor: string; color: string }) {
  return (
    <View style={[styles.kpiCard, { borderLeftColor: color }]}>
      <Text style={styles.kpiValor}>{valor}</Text>
      <Text style={styles.kpiTitulo}>{titulo}</Text>
    </View>
  );
}

export default function Dashboard({ navigation }) {
  const [emociones, setEmociones] = useState<{ emotion: string; count: number }[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchEmociones();
  }, []);

  const fetchEmociones = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      if (json.status === 'success') {
        setEmociones(json.data);
      }
    } catch (error) {
      console.error('Error al obtener emociones:', error);
    } finally {
      setCargando(false);
    }
  };

  // Calcular datos derivados
  const totalRegistros = emociones.reduce((sum, e) => sum + e.count, 0);

  const emocionDominante = emociones.length > 0
    ? emociones.reduce((max, e) => e.count > max.count ? e : max, emociones[0])
    : { emotion: '-', count: 0 };

  const satisfaccion = emociones.find(e => e.emotion === 'Satisfacción');
  const porcentajeSatisfaccion = totalRegistros > 0 && satisfaccion
    ? Math.round((satisfaccion.count / totalRegistros) * 100)
    : 0;

  const negativas = emociones
    .filter(e => ['Frustración', 'Desmotivación', 'Inseguridad', 'Rechazo'].includes(e.emotion))
    .reduce((sum, e) => sum + e.count, 0);
  const porcentajeNegativas = totalRegistros > 0
    ? Math.round((negativas / totalRegistros) * 100)
    : 0;

  const kpis = [
    { titulo: 'Total Registros', valor: `${totalRegistros}`, color: '#9bd0bb' },
    { titulo: 'Emoción Dominante', valor: emocionDominante.emotion, color: coloresEmocion[emocionDominante.emotion] || '#6cb4ee' },
    { titulo: 'Satisfacción', valor: `${porcentajeSatisfaccion}%`, color: '#9bd0bb' },
    { titulo: 'Emociones Negativas', valor: `${porcentajeNegativas}%`, color: '#e76f51' },
  ];

  // Datos para gráfico de barras
  const barData = {
    labels: emociones.map(e => e.emotion.substring(0, 6)),
    datasets: [{ data: emociones.map(e => e.count) }],
  };

  // Datos para gráfico de pie
  const pieData = emociones.map(e => ({
    name: e.emotion,
    population: e.count,
    color: coloresEmocion[e.emotion] || '#ccc',
    legendFontColor: '#333',
    legendFontSize: 12,
  }));

  if (cargando) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#9bd0bb" />
        <Text style={{ marginTop: 10, color: '#888' }}>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.drawerContainer}>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Clima Laboral</Text>

        {/* KPIs */}
        <View style={styles.kpiContainer}>
          {kpis.map((kpi, index) => (
            <KPICard key={index} titulo={kpi.titulo} valor={kpi.valor} color={kpi.color} />
          ))}
        </View>

        {/* Gráfico de Barras */}
        {emociones.length > 0 && (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitulo}>Emociones Detectadas</Text>
            <BarChart
              data={barData}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
              yAxisLabel=""
              yAxisSuffix=""
            />
          </View>
        )}

        {/* Gráfico de Pie */}
        {emociones.length > 0 && (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitulo}>Distribución de Emociones</Text>
            <PieChart
              data={pieData}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        )}

        {/* Tabla de detalle */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitulo}>Detalle por Emoción</Text>
          {emociones.map((e, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableDot, { backgroundColor: coloresEmocion[e.emotion] || '#ccc' }]} />
              <Text style={styles.tableEmocion}>{e.emotion}</Text>
              <Text style={styles.tableCount}>{e.count}</Text>
              <Text style={styles.tablePercent}>
                {totalRegistros > 0 ? Math.round((e.count / totalRegistros) * 100) : 0}%
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================================
// ESTILOS
// ==========================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  drawerContainer: {
    width: '25%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerButton: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#9bd0bb',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  kpiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  kpiCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kpiValor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  kpiTitulo: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  tableEmocion: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tableCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 40,
    textAlign: 'right',
  },
  tablePercent: {
    fontSize: 14,
    color: '#888',
    width: 45,
    textAlign: 'right',
  },
});
