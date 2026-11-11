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

export default function App() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [categoria, setCategoria] = useState('Faculdade');
  const [busca, setBusca] = useState('');
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

    const novoContato = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      nomeCompleto: `${nomeLimpo} ${sobrenomeLimpo}`,
      iniciais: `${nomeLimpo[0]}${sobrenomeLimpo[0]}`.toUpperCase(),
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
    setMensagem('');
    setErro(false);
    Keyboard.dismiss();
  };

  const alternarFavorito = (id) => {
    setContatos((listaAtual) =>
      listaAtual.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c))
    );
  };

  const excluirContato = (id) => {
    setContatos((listaAtual) => listaAtual.filter((c) => c.id !== id));
    setErro(false);
    setMensagem('Contato removido!');
  };

  const contatosFiltrados = contatos.filter((c) =>
    c.nomeCompleto.toLowerCase().includes(busca.trim().toLowerCase())
  );

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

            {/* Botões de Ação */}
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
                style={styles.botaoSalvar}
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

          {/* Barra de Busca e Lista de Contatos */}
          <View style={styles.secaoLista}>
            <Text style={styles.tituloSecao}>Contatos Cadastrados</Text>

            <TextInput
              testID="input-busca"
              style={styles.inputBusca}
              placeholder="Buscar contato..."
              placeholderTextColor="#9CA3AF"
              value={busca}
              onChangeText={setBusca}
              autoCorrect={false}
            />

            <View testID="lista-contatos" style={styles.listaContainer}>
              {contatosFiltrados.length === 0 ? (
                <View style={styles.estadoVazio}>
                  <Text style={styles.textoVazio}>
                    {contatos.length === 0
                      ? 'Nenhum contato cadastrado ainda'
                      : 'Nenhum contato encontrado na busca'}
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
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  resumoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badgeContador: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  textoContador: {
    color: '#1E40AF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  badgeFavoritos: {
    backgroundColor: '#FEF3C7',
  },
  textoFavoritos: {
    color: '#B45309',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    gap: 12,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 17,
    color: '#111827',
  },
  categoriasRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chipCategoria: {
    flex: 1,
    paddingVertical: 9,
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
    fontSize: 14,
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
    marginTop: 4,
  },
  botaoSecundario: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textoBotaoSecundario: {
    color: '#374151',
    fontSize: 17,
    fontWeight: 'bold',
  },
  botaoSalvar: {
    flex: 2,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  caixaMensagem: {
    marginTop: 12,
    paddingVertical: 11,
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
    fontSize: 16,
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
    marginTop: 18,
    gap: 10,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  inputBusca: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
  },
  listaContainer: {
    gap: 10,
  },
  estadoVazio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textoVazio: {
    color: '#6B7280',
    fontSize: 15,
  },
  itemContato: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoAvatar: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContato: {
    flex: 1,
    gap: 4,
  },
  nomeLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  textoContato: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  badgeEstrela: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  detalhesLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagCategoria: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  textoTelefone: {
    fontSize: 13,
    color: '#4B5563',
  },
  acoesContato: {
    flexDirection: 'row',
    gap: 6,
  },
  btnAcao: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
  },
  btnFavoritoAtivo: {
    backgroundColor: '#F59E0B',
  },
  textoBtnFavoritar: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400E',
  },
  btnExcluir: {
    backgroundColor: '#FEE2E2',
  },
  textoBtnExcluir: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#B91C1C',
  },
});
