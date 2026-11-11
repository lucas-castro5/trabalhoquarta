import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CATEGORIAS = ['Faculdade', 'Trabalho', 'Família'];
const FILTROS_ABA = ['Todos', 'Favoritos', 'Faculdade', 'Trabalho', 'Família'];

const CONTATOS_GRUPO_8 = [
  {
    id: 'g8-1',
    nome: 'Luiz',
    sobrenome: 'Eduardo',
    nomeCompleto: 'Luiz Eduardo',
    iniciais: 'LE',
    telefone: '11987654321',
    categoria: 'Faculdade',
    favorito: true,
  },
  {
    id: 'g8-2',
    nome: 'Lucas',
    sobrenome: 'Santos',
    nomeCompleto: 'Lucas Santos',
    iniciais: 'LS',
    telefone: '11999998888',
    categoria: 'Trabalho',
    favorito: false,
  },
  {
    id: 'g8-3',
    nome: 'Jonathan',
    sobrenome: 'Oliveira',
    nomeCompleto: 'Jonathan Oliveira',
    iniciais: 'JO',
    telefone: '11977776666',
    categoria: 'Faculdade',
    favorito: false,
  },
  {
    id: 'g8-4',
    nome: 'João',
    sobrenome: 'Ferreira',
    nomeCompleto: 'João Ferreira',
    iniciais: 'JF',
    telefone: '11966665555',
    categoria: 'Família',
    favorito: false,
  },
];

export default function App() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [categoria, setCategoria] = useState('Faculdade');
  const [editandoId, setEditandoId] = useState(null);

  const [busca, setBusca] = useState('');
  const [abaFiltro, setAbaFiltro] = useState('Todos');

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [contatos, setContatos] = useState([]);

  const salvarContato = () => {
    const nomeLimpo = nome.trim();
    const sobrenomeLimpo = sobrenome.trim();
    const telefoneLimpo = telefone.trim();

    if (!nomeLimpo || !sobrenomeLimpo) {
      setErro(true);
      setMensagem('Preencha todos os campos');
      return;
    }

    const nomeCompleto = `${nomeLimpo} ${sobrenomeLimpo}`;
    const iniciais = `${nomeLimpo[0]}${sobrenomeLimpo[0]}`.toUpperCase();

    if (editandoId) {
      setContatos((listaAtual) =>
        listaAtual.map((c) =>
          c.id === editandoId
            ? {
                ...c,
                nome: nomeLimpo,
                sobrenome: sobrenomeLimpo,
                nomeCompleto,
                iniciais,
                telefone: telefoneLimpo,
                categoria,
              }
            : c
        )
      );
      setEditandoId(null);
      setNome('');
      setSobrenome('');
      setTelefone('');
      setErro(false);
      setMensagem('Contato atualizado com sucesso!');
      Keyboard.dismiss();
      return;
    }

    const duplicado = contatos.some(
      (c) => c.nomeCompleto.toLowerCase() === nomeCompleto.toLowerCase()
    );
    if (duplicado) {
      setErro(true);
      setMensagem('Contato já cadastrado!');
      Keyboard.dismiss();
      return;
    }

    const novoContato = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      nome: nomeLimpo,
      sobrenome: sobrenomeLimpo,
      nomeCompleto,
      iniciais,
      telefone: telefoneLimpo,
      categoria,
      favorito: false,
    };

    setContatos((listaAtual) => [novoContato, ...listaAtual]);
    setNome('');
    setSobrenome('');
    setTelefone('');
    setErro(false);
    setMensagem('Contato salvo com sucesso!');
    Keyboard.dismiss();
  };

  const limparCampos = () => {
    setNome('');
    setSobrenome('');
    setTelefone('');
    setCategoria('Faculdade');
    setEditandoId(null);
    setMensagem('');
    setErro(false);
    Keyboard.dismiss();
  };

  const iniciarEdicao = (contato) => {
    setEditandoId(contato.id);
    setNome(contato.nome || contato.nomeCompleto.split(' ')[0]);
    setSobrenome(
      contato.sobrenome || contato.nomeCompleto.split(' ').slice(1).join(' ')
    );
    setTelefone(contato.telefone || '');
    setCategoria(contato.categoria || 'Faculdade');
    setErro(false);
    setMensagem(`Editando: ${contato.nomeCompleto}`);
  };

  const carregarExemplos = () => {
    setContatos(CONTATOS_GRUPO_8);
    setAbaFiltro('Todos');
    setBusca('');
    setErro(false);
    setMensagem('Contatos de exemplo carregados!');
  };

  const limparLista = () => {
    setContatos([]);
    setEditandoId(null);
    setErro(false);
    setMensagem('Lista limpa com sucesso!');
  };

  const alternarFavorito = (id) => {
    setContatos((listaAtual) =>
      listaAtual.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c))
    );
  };

  const excluirContato = (id) => {
    setContatos((listaAtual) => listaAtual.filter((c) => c.id !== id));
    if (editandoId === id) {
      setEditandoId(null);
    }
    setErro(false);
    setMensagem('Contato removido!');
  };

  const contatosFiltrados = contatos.filter((c) => {
    const bateBusca =
      c.nomeCompleto.toLowerCase().includes(busca.trim().toLowerCase()) ||
      (c.telefone && c.telefone.includes(busca.trim()));
    if (!bateBusca) return false;
    if (abaFiltro === 'Todos') return true;
    if (abaFiltro === 'Favoritos') return c.favorito;
    return c.categoria === abaFiltro;
  });

  const totalFavoritos = contatos.filter((c) => c.favorito).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.subtitulo}>GRUPO 8 • DEMO MAESTRO E2E</Text>
            <Text style={styles.titulo}>Cadastro de Contatos</Text>

            <View style={styles.resumoRow}>
              <View style={styles.badgeContador}>
                <Text testID="contador-contatos" style={styles.textoContador}>
                  Total: {contatos.length}
                </Text>
              </View>
              <View style={[styles.badgeContador, styles.badgeFavoritos]}>
                <Text testID="contador-favoritos" style={styles.textoFavoritos}>
                  Favoritos: {totalFavoritos}
                </Text>
              </View>
            </View>
          </View>

          {/* Formulário */}
          <View style={styles.cardForm}>
            <View style={styles.linhaInputs}>
              <View style={styles.colunaInput}>
                <Text style={styles.label}>Nome *</Text>
                <TextInput
                  testID="input-nome"
                  style={styles.input}
                  placeholder="Nome"
                  placeholderTextColor="#9CA3AF"
                  value={nome}
                  onChangeText={setNome}
                  autoCorrect={false}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.colunaInput}>
                <Text style={styles.label}>Sobrenome *</Text>
                <TextInput
                  testID="input-sobrenome"
                  style={styles.input}
                  placeholder="Sobrenome"
                  placeholderTextColor="#9CA3AF"
                  value={sobrenome}
                  onChangeText={setSobrenome}
                  autoCorrect={false}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Telefone (opcional)</Text>
              <TextInput
                testID="input-telefone"
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#9CA3AF"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                autoCorrect={false}
              />
            </View>

            {/* Seletor de Categoria */}
            <View>
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.categoriasRow}>
                {CATEGORIAS.map((cat) => {
                  const selecionada = categoria === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      testID={`cat-${cat}`}
                      style={[
                        styles.chipCategoria,
                        selecionada && styles.chipCategoriaAtiva,
                      ]}
                      onPress={() => setCategoria(cat)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.textoChipCategoria,
                          selecionada && styles.textoChipCategoriaAtiva,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Botões Principais */}
            <View style={styles.botoesRow}>
              <TouchableOpacity
                testID="btn-limpar"
                style={styles.botaoSecundario}
                onPress={limparCampos}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoSecundario}>Limpar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                testID="btn-salvar"
                style={[
                  styles.botaoSalvar,
                  editandoId && styles.botaoSalvarEdicao,
                ]}
                onPress={salvarContato}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoSalvar}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mensagem de Feedback */}
          {mensagem !== '' && (
            <View
              style={[
                styles.caixaMensagem,
                erro ? styles.caixaErro : styles.caixaSucesso,
              ]}
            >
              <Text
                testID="mensagem-feedback"
                style={[
                  styles.textoMensagem,
                  erro ? styles.textoErro : styles.textoSucesso,
                ]}
              >
                {mensagem}
              </Text>
            </View>
          )}

          {/* Barra de Ferramentas Rápidas + Busca + Abas de Filtro */}
          <View style={styles.secaoLista}>
            <View style={styles.cabecalhoListaRow}>
              <Text style={styles.tituloSecao}>Contatos Cadastrados</Text>
              <View style={styles.acoesRapidasRow}>
                <TouchableOpacity
                  testID="btn-exemplos"
                  style={styles.btnRapido}
                  onPress={carregarExemplos}
                >
                  <Text style={styles.textoBtnRapido}>Carregar Grupo 8</Text>
                </TouchableOpacity>

                {contatos.length > 0 && (
                  <TouchableOpacity
                    testID="btn-limpar-lista"
                    style={[styles.btnRapido, styles.btnRapidoPerigo]}
                    onPress={limparLista}
                  >
                    <Text style={styles.textoBtnRapidoPerigo}>Zerar Lista</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <TextInput
              testID="input-busca"
              style={styles.inputBusca}
              placeholder="Buscar contato..."
              placeholderTextColor="#9CA3AF"
              value={busca}
              onChangeText={setBusca}
              autoCorrect={false}
            />

            {/* Abas de Filtro Rápido */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.abasContainer}
            >
              {FILTROS_ABA.map((aba) => {
                const ativa = abaFiltro === aba;
                return (
                  <TouchableOpacity
                    key={aba}
                    testID={`filtro-${aba}`}
                    style={[styles.abaChip, ativa && styles.abaChipAtiva]}
                    onPress={() => setAbaFiltro(aba)}
                  >
                    <Text
                      style={[
                        styles.textoAbaChip,
                        ativa && styles.textoAbaChipAtiva,
                      ]}
                    >
                      {`Filtro: ${aba}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Lista de Contatos */}
            <View testID="lista-contatos" style={styles.listaContainer}>
              {contatosFiltrados.length === 0 ? (
                <View style={styles.estadoVazio}>
                  <Text style={styles.textoVazio}>
                    {contatos.length === 0
                      ? 'Nenhum contato cadastrado ainda'
                      : 'Nenhum contato encontrado neste filtro'}
                  </Text>
                </View>
              ) : (
                contatosFiltrados.map((contato, index) => (
                  <View key={contato.id} style={styles.itemContato}>
                    <View style={styles.avatar}>
                      <Text style={styles.textoAvatar}>{contato.iniciais}</Text>
                    </View>

                    <View style={styles.infoContato}>
                      <View style={styles.nomeLinha}>
                        <Text style={styles.textoContato}>
                          {contato.nomeCompleto}
                        </Text>
                        {contato.favorito && (
                          <Text style={styles.badgeEstrela}>★ Favorito</Text>
                        )}
                      </View>

                      <View style={styles.detalhesLinha}>
                        <Text style={styles.tagCategoria}>
                          {contato.categoria}
                        </Text>
                        {contato.telefone !== '' && (
                          <Text style={styles.textoTelefone}>
                            📞 {contato.telefone}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={styles.acoesContato}>
                      <TouchableOpacity
                        testID={`btn-favoritar-${index}`}
                        style={[
                          styles.btnAcao,
                          contato.favorito && styles.btnFavoritoAtivo,
                        ]}
                        onPress={() => alternarFavorito(contato.id)}
                      >
                        <Text style={styles.textoBtnFavoritar}>
                          {contato.favorito ? '★' : 'Favoritar'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        testID={`btn-editar-${index}`}
                        style={[styles.btnAcao, styles.btnEditar]}
                        onPress={() => iniciarEdicao(contato)}
                      >
                        <Text style={styles.textoBtnEditar}>Editar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        testID={`btn-excluir-${index}`}
                        style={[styles.btnAcao, styles.btnExcluir]}
                        onPress={() => excluirContato(contato.id)}
                      >
                        <Text style={styles.textoBtnExcluir}>Excluir</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  resumoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badgeContador: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  textoContador: {
    color: '#1E40AF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  badgeFavoritos: {
    backgroundColor: '#FEF3C7',
  },
  textoFavoritos: {
    color: '#B45309',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  linhaInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  colunaInput: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 16,
    color: '#111827',
  },
  categoriasRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chipCategoria: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  chipCategoriaAtiva: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  textoChipCategoria: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  textoChipCategoriaAtiva: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  botoesRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },
  botaoSecundario: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoBotaoSecundario: {
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoSalvar: {
    flex: 2,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoSalvarEdicao: {
    backgroundColor: '#059669',
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  caixaMensagem: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  caixaSucesso: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  caixaErro: {
    backgroundColor: '#FEE2E2',
    borderColor: '#DC2626',
  },
  textoMensagem: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoSucesso: {
    color: '#15803D',
  },
  textoErro: {
    color: '#B91C1C',
  },
  secaoLista: {
    marginTop: 14,
    gap: 8,
  },
  cabecalhoListaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  acoesRapidasRow: {
    flexDirection: 'row',
    gap: 6,
  },
  btnRapido: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  textoBtnRapido: {
    color: '#3730A3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnRapidoPerigo: {
    backgroundColor: '#FEE2E2',
  },
  textoBtnRapidoPerigo: {
    color: '#B91C1C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputBusca: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 15,
    color: '#111827',
  },
  abasContainer: {
    gap: 6,
    paddingVertical: 2,
  },
  abaChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  abaChipAtiva: {
    backgroundColor: '#1D4ED8',
  },
  textoAbaChip: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  textoAbaChipAtiva: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listaContainer: {
    gap: 8,
  },
  estadoVazio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textoVazio: {
    color: '#6B7280',
    fontSize: 14,
  },
  itemContato: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoAvatar: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoContato: {
    flex: 1,
    gap: 3,
  },
  nomeLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  textoContato: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  badgeEstrela: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  detalhesLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagCategoria: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  textoTelefone: {
    fontSize: 12,
    color: '#4B5563',
  },
  acoesContato: {
    flexDirection: 'row',
    gap: 4,
  },
  btnAcao: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 7,
    backgroundColor: '#FEF3C7',
  },
  btnFavoritoAtivo: {
    backgroundColor: '#F59E0B',
  },
  textoBtnFavoritar: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#92400E',
  },
  btnEditar: {
    backgroundColor: '#DBEAFE',
  },
  textoBtnEditar: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  btnExcluir: {
    backgroundColor: '#FEE2E2',
  },
  textoBtnExcluir: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#B91C1C',
  },
});
