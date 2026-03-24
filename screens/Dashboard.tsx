import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// ==========================================================
// DATOS (fijos por ahora, fáciles de reemplazar con API)
// ==========================================================

const kpis = [
  { titulo: 'Satisfacción General', valor: '78%', color: '#9bd0bb' },
  { titulo: 'Participación', valor: '85%', color: '#6cb4ee' },
  { titulo: 'Estrés Promedio', valor: '32%', color: '#f4a261' },
  { titulo: 'Retención', valor: '91%', color: '#e76f51' },
];

const emocionesPorCategoria = {
  labels: ['Alegría', 'Tristeza', 'Enojo', 'Miedo', 'Amor', 'Sorpresa'],
  datasets: [{ data: [42, 15, 10, 8, 18, 7] }],
};

const tendenciaMensual = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [{ data: [65, 70, 68, 75, 72, 78], strokeWidth: 2 }],
};

const distribucionEmociones = [
  { name: 'Alegría', population: 42, color: '#9bd0bb', legendFontColor: '#333', legendFontSize: 13 },
  { name: 'Tristeza', population: 15, color: '#6cb4ee', legendFontColor: '#333', legendFontSize: 13 },
  { name: 'Enojo', population: 10, color: '#f4a261', legendFontColor: '#333', legendFontSize: 13 },
  { name: 'Miedo', population: 8, color: '#e76f51', legendFontColor: '#333', legendFontSize: 13 },
  { name: 'Amor', population: 18, color: '#a78bfa', legendFontColor: '#333', legendFontSize: 13 },
  { name: 'Sorpresa', population: 7, color: '#fbbf24', legendFontColor: '#333', legendFontSize: 13 },
];

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

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Clima Laboral</Text>

        {/* KPIs */}
        <View style={styles.kpiContainer}>
          {kpis.map((kpi, index) => (
            <KPICard key={index} titulo={kpi.titulo} valor={kpi.valor} color={kpi.color} />
          ))}
        </View>

        {/* Gráfico de Barras */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitulo}>Emociones Detectadas</Text>
          <BarChart
            data={emocionesPorCategoria}
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

        {/* Gráfico de Líneas */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitulo}>Tendencia Mensual de Satisfacción</Text>
          <LineChart
            data={tendenciaMensual}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(108, 180, 238, ${opacity})`,
            }}
            style={styles.chart}
            bezier
            yAxisSuffix="%"
            yAxisLabel=""
          />
        </View>

        {/* Gráfico de Pie */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitulo}>Distribución de Emociones</Text>
          <PieChart
            data={distribucionEmociones}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
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
    fontSize: 28,
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
});
