/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./app/src/js/app.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/dom-injector.js\nfunction domInjector(seletor) {\n    return function (target, propertyKey) {\n        console.log(`Modificando protype ${target.constructor.name}\n             e adicionando getter para a propriedade ${propertyKey}`);\n        let elemento;\n        const getter = function () {\n            if (!elemento) {\n                elemento = document.querySelector(seletor);\n                console.log(`buscando elemento do DOM com o seletor \n                 ${seletor} para injetar em ${propertyKey}`);\n            }\n            return elemento;\n        };\n        Object.defineProperty(target, propertyKey, { get: getter });\n    };\n}\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/inspect.js\nfunction inspect(target, propertyKey, descriptor) {\n    const metodoOriginal = descriptor.value;\n    descriptor.value = function (...args) {\n        console.log(`--- Método ${propertyKey}`);\n        console.log(`------ parâmetros: ${JSON.stringify(args)}`);\n        const retorno = metodoOriginal.apply(this, args);\n        console.log(`------ retorno: ${JSON.stringify(retorno)}`);\n        return retorno;\n    };\n    return descriptor;\n}\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/logar-tempo-de-execucao.js\nfunction logarTempoDeExecucao(emSegundos = false) {\n    return function (target, propertyKey, descriptor) {\n        const metodoOriginal = descriptor.value;\n        descriptor.value = function (...args) {\n            let divisor = 1;\n            let unidade = \'milisegundos\';\n            if (emSegundos) {\n                divisor = 1000;\n                unidade = \'segundos\';\n            }\n            const t1 = performance.now();\n            const retorno = metodoOriginal.apply(this, args);\n            const t2 = performance.now();\n            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}`);\n            retorno;\n        };\n        return descriptor;\n    };\n}\n\n;// CONCATENATED MODULE: ./app/src/js/enums/dias-da-semana.js\nvar DiasDaSemana;\n(function (DiasDaSemana) {\n    DiasDaSemana[DiasDaSemana["DOMINGO"] = 0] = "DOMINGO";\n    DiasDaSemana[DiasDaSemana["SEGUNDA"] = 1] = "SEGUNDA";\n    DiasDaSemana[DiasDaSemana["TERCA"] = 2] = "TERCA";\n    DiasDaSemana[DiasDaSemana["QUARTA"] = 3] = "QUARTA";\n    DiasDaSemana[DiasDaSemana["QUINTA"] = 4] = "QUINTA";\n    DiasDaSemana[DiasDaSemana["SEXTA"] = 5] = "SEXTA";\n    DiasDaSemana[DiasDaSemana["SABADO"] = 6] = "SABADO";\n})(DiasDaSemana || (DiasDaSemana = {}));\n\n;// CONCATENATED MODULE: ./app/src/js/models/negociacao.js\nclass Negociacao {\n    constructor(_data, quantidade, valor) {\n        this._data = _data;\n        this.quantidade = quantidade;\n        this.valor = valor;\n    }\n    static criaDe(dataString, quantidadeString, valorString) {\n        const exp = /-/g;\n        const date = new Date(dataString.replace(exp, \',\'));\n        const quantidade = parseInt(quantidadeString);\n        const valor = parseFloat(valorString);\n        return new Negociacao(date, quantidade, valor);\n    }\n    get volume() {\n        return this.quantidade * this.valor;\n    }\n    get data() {\n        const data = new Date(this._data.getTime());\n        return data;\n    }\n    paraTexto() {\n        return `\n            Data: ${this.data},\n            Quantidade: ${this.quantidade},\n            Valor: ${this.valor}\n        `;\n    }\n    ehIgual(negociacao) {\n        return this.data.getDate() === negociacao.data.getDate()\n            && this.data.getMonth() === negociacao.data.getMonth()\n            && this.data.getFullYear() === negociacao.data.getFullYear();\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/models/negociacoes.js\nclass Negociacoes {\n    constructor() {\n        this.negociacoes = [];\n    }\n    adiciona(negociacao) {\n        this.negociacoes.push(negociacao);\n    }\n    lista() {\n        return this.negociacoes;\n    }\n    paraTexto() {\n        return JSON.stringify(this.negociacoes, null, 2);\n    }\n    ehIgual(negociacoes) {\n        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/services/negociacoes-service.js\n\nclass NegociacoesService {\n    obterNegociacoesDoDia() {\n        return fetch(`http://localhost:8080/dados`)\n            .then(res => res.json())\n            .then((dados) => {\n            return dados.map(dadoDeHoje => {\n                return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante);\n            });\n        });\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/utils/imprimir.js\nfunction imprimir(...objetos) {\n    for (let objeto of objetos) {\n        console.log(objeto.paraTexto());\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/views/view.js\nclass View {\n    constructor(seletor) {\n        const elemento = document.querySelector(seletor);\n        if (elemento) {\n            this.elemento = elemento;\n        }\n        else {\n            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);\n        }\n    }\n    update(model) {\n        let template = this.template(model);\n        this.elemento.innerHTML = template;\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/views/mensagem-view.js\n\nclass MensagemView extends View {\n    template(model) {\n        return `\n            <p class="alert alert-info">${model}</p>\n        `;\n    }\n}\n\n;// CONCATENATED MODULE: ./app/src/js/decorators/escapar.js\nfunction escapar(target, propertyKey, descriptor) {\n    const metodoOriginal = descriptor.value;\n    descriptor.value = function (...args) {\n        let retorno = metodoOriginal.apply(this, args);\n        if (typeof retorno === \'string\') {\n            retorno = retorno\n                .replace(/<script>[\\s\\S]*?<\\/script>/, \'\');\n        }\n        return retorno;\n    };\n    return descriptor;\n}\n\n;// CONCATENATED MODULE: ./app/src/js/views/negociacoes-view.js\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\nclass NegociacoesView extends View {\n    template(model) {\n        return `\n        <table class="table table-hover table-bordered">\n            <thead>\n                <tr>\n                    <th>DATA</th>\n                    <th>QUANTIDADE</th>\n                    <th>VALOR</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${model.lista().map(negociacao => {\n            return `\n                        <tr>\n                            <td>${this.formatar(negociacao.data)}\n                            </td>\n                            <td>\n                                ${negociacao.quantidade}\n                            </td>\n                            <td>\n                                ${negociacao.valor}\n                            </td>\n                        </tr>\n                    `;\n        }).join(\'\')}\n            </tbody>\n        </table>\n        `;\n    }\n    formatar(data) {\n        return new Intl.DateTimeFormat()\n            .format(data);\n    }\n}\n__decorate([\n    escapar\n], NegociacoesView.prototype, "template", null);\n\n;// CONCATENATED MODULE: ./app/src/js/controllers/negociacao-controller.js\nvar negociacao_controller_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\n\n\n\n\n\n\n\n\nclass NegociacaoController {\n    constructor() {\n        this.negociacoes = new Negociacoes();\n        this.negociacoesView = new NegociacoesView(\'#negociacoesView\');\n        this.mensagemView = new MensagemView(\'#mensagemView\');\n        this.negociacoesService = new NegociacoesService();\n        this.negociacoesView.update(this.negociacoes);\n    }\n    adiciona() {\n        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);\n        if (!this.ehDiaUtil(negociacao.data)) {\n            this.mensagemView\n                .update(\'Apenas negociações em dias úteis são aceitas\');\n            return;\n        }\n        this.negociacoes.adiciona(negociacao);\n        imprimir(negociacao, this.negociacoes);\n        this.limparFormulario();\n        this.atualizaView();\n    }\n    importaDados() {\n        this.negociacoesService\n            .obterNegociacoesDoDia()\n            .then(negociacoesDeHoje => {\n            return negociacoesDeHoje.filter(negociacaoDeHoje => {\n                return !this.negociacoes\n                    .lista()\n                    .some(negociacao => negociacao\n                    .ehIgual(negociacaoDeHoje));\n            });\n        })\n            .then(negociacoesDeHoje => {\n            for (let negociacao of negociacoesDeHoje) {\n                this.negociacoes.adiciona(negociacao);\n            }\n            this.negociacoesView.update(this.negociacoes);\n        });\n    }\n    ehDiaUtil(data) {\n        return data.getDay() > DiasDaSemana.DOMINGO\n            && data.getDay() < DiasDaSemana.SABADO;\n    }\n    limparFormulario() {\n        this.inputData.value = \'\';\n        this.inputQuantidade.value = \'\';\n        this.inputValor.value = \'\';\n        this.inputData.focus();\n    }\n    atualizaView() {\n        this.negociacoesView.update(this.negociacoes);\n        this.mensagemView.update(\'Negociação adicionada com sucesso\');\n    }\n}\nnegociacao_controller_decorate([\n    domInjector(\'#data\')\n], NegociacaoController.prototype, "inputData", void 0);\nnegociacao_controller_decorate([\n    domInjector(\'#quantidade\')\n], NegociacaoController.prototype, "inputQuantidade", void 0);\nnegociacao_controller_decorate([\n    domInjector(\'#valor\')\n], NegociacaoController.prototype, "inputValor", void 0);\nnegociacao_controller_decorate([\n    inspect,\n    logarTempoDeExecucao()\n], NegociacaoController.prototype, "adiciona", null);\n\n;// CONCATENATED MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css\n// extracted by mini-css-extract-plugin\n\n;// CONCATENATED MODULE: ./app/src/js/app.js\n\n\n\nconst controller = new NegociacaoController();\nconst app_form = document.querySelector(\'.form\');\nif (app_form) {\n    app_form.addEventListener(\'submit\', event => {\n        event.preventDefault();\n        controller.adiciona();\n    });\n}\nelse {\n    throw Error(\'Não foi possível inicializar a aplicação. Verifique se o form existe.\');\n}\n\nconst botaoImporta = document.querySelector(\'#botao-importa\');\nif (botaoImporta) {\n    botaoImporta.addEventListener(\'click\', () => {\n        controller.importaDados();\n    });\n} else {\n    throw Error(\'Botão importa não foi encontrado\');\n}\n\n//# sourceURL=webpack://alurabank/./app/src/js/app.js_+_14_modules?')}},__webpack_require__={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},__webpack_exports__={};__webpack_modules__["./app/src/js/app.js"](0,__webpack_exports__,__webpack_require__)})();