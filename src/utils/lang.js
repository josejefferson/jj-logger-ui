const lang = {
  body: {
    noMatch: 'Nenhum log',
    toolTip: 'Ordenar',
    columnHeaderTooltip: (column) => `Ordenar por ${column.label}`
  },
  pagination: {
    next: 'Próxima página',
    previous: 'Página anterior',
    rowsPerPage: 'Logs por página:',
    displayRows: 'de'
  },
  toolbar: {
    search: 'Pesquisar',
    downloadCsv: 'Baixar CSV',
    print: 'Imprimir',
    viewColumns: 'Colunas visíveis',
    filterTable: 'Filtrar tabela',
    adjustColumnWidth: 'Ajustar largura das colunas',
    refresh: 'Atualizar logs',
    downloadJson: 'Baixar JSON',
    uploadJson: 'Importar logs de JSON',
    dbFilter: 'Filtros em JSON do banco de dados',
    settings: 'Configurar servidor'
  },
  filter: {
    all: 'Todos',
    title: 'FILTROS',
    reset: 'REDEFINIR',
    apply: 'Filtrar',
    dateTime: 'Data/hora',
    before: 'Antes de',
    after: 'Depois de'
  },
  viewColumns: {
    title: 'Colunas visíveis',
    titleAria: 'Exibir/Ocultar colunas da tabela'
  },
  selectedRows: {
    text: 'linha(s) selecionadas',
    delete: 'Excluir',
    deleteAria: 'Excluir linhas selecionadas'
  },
  dbFilter: {
    dialogTitle: 'Filtros JSON do banco de dados',
    dialogTextFieldLabel: 'JSON',
    dialogButtonCancel: 'Cancelar',
    dialogButtonOK: 'OK',
    dialogReset: 'Redefinir para o padrão',
    dialogSave: 'Salvar como padrão',
    dialogClear: 'Limpar filtros'
  },
  settings: {
    dialogTitle: 'Configurar servidor',
    dialogTextFieldURL: 'URL do servidor',
    dialogTextFieldUsername: 'Nome de usuário (opcional)',
    dialogTextFieldPassword: 'Senha (opcional)',
    dialogButtonCancel: 'Cancelar',
    dialogButtonOK: 'OK',
    dialogReset: 'Redefinir para o padrão',
    dialogSave: 'Salvar como padrão',
    dialogClear: 'Limpar filtros'
  }
}

export default lang