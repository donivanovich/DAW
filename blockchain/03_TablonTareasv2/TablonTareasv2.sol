// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TablonTareas {

    struct Tarea {
        string descripcion;
        bool completada;
        address creador;
        uint256 recompensa;
        address completadaPor;
        bool cancelada;
    }

    Tarea[] private tareas;

    mapping(address => uint256[]) private tareasPorCreador;
    mapping(address => uint256) public recompensaGanada;

    address public immutable owner;
    bool public pausado;

    error IndiceInvalido(uint256 indice);
    error NoEresElCreador();
    error TareaNoDisponible();
    error SinRecompensa();

    event TareaCreada(
        uint256 indexed id,
        address indexed creador,
        uint256 recompensa
    );

    event TareaCompletada(
        uint256 indexed id,
        address indexed completadaPor,
        uint256 recompensa
    );

    event TareaCancelada(
        uint256 indexed id,
        address indexed creador,
        uint256 recompensaDevuelta
    );

    event ContratoPausado(bool pausado);

    constructor() {
        owner = msg.sender;
    }

    modifier soloOwner() {
        require(msg.sender == owner, "Solo el owner");
        _;
    }

    modifier indiceValido(uint256 _i) {
        if (_i >= tareas.length) {
            revert IndiceInvalido(_i);
        }
        _;
    }

    modifier soloCreador(uint256 _i) {
        if (msg.sender != tareas[_i].creador) {
            revert NoEresElCreador();
        }
        _;
    }

    modifier noEnPausa() {
        require(!pausado, "Contrato pausado");
        _;
    }

    function crearTarea(
        string memory _descripcion
    ) public payable noEnPausa {
        uint256 indice = tareas.length;

        tareas.push(
            Tarea({
                descripcion: _descripcion,
                completada: false,
                creador: msg.sender,
                recompensa: msg.value,
                completadaPor: address(0),
                cancelada: false
            })
        );

        tareasPorCreador[msg.sender].push(indice);

        emit TareaCreada(indice, msg.sender, msg.value);
    }

    function completar(
        uint256 _indice
    ) public indiceValido(_indice) noEnPausa {
        Tarea storage t = tareas[_indice];

        if (t.completada || t.cancelada) {
            revert TareaNoDisponible();
        }

        require(
            msg.sender != t.creador,
            "No puedes completar tu tarea"
        );

        uint256 pago = t.recompensa;

        t.completada = true;
        t.completadaPor = msg.sender;
        t.recompensa = 0;

        if (pago > 0) {
            recompensaGanada[msg.sender] += pago;

            (bool exito, ) = payable(msg.sender).call{value: pago}("");
            require(exito, "Error al enviar recompensa");
        }

        emit TareaCompletada(_indice, msg.sender, pago);
    }

    function cancelar(
        uint256 _indice
    )
        public
        indiceValido(_indice)
        soloCreador(_indice)
    {
        Tarea storage t = tareas[_indice];

        if (t.completada || t.cancelada) {
            revert TareaNoDisponible();
        }

        uint256 devolucion = t.recompensa;

        t.cancelada = true;
        t.recompensa = 0;

        if (devolucion > 0) {
            (bool exito, ) = payable(t.creador).call{
                value: devolucion
            }("");

            require(exito, "Error al devolver recompensa");
        }

        emit TareaCancelada(
            _indice,
            t.creador,
            devolucion
        );
    }

    function pausar() public soloOwner {
        pausado = true;
        emit ContratoPausado(true);
    }

    function reanudar() public soloOwner {
        pausado = false;
        emit ContratoPausado(false);
    }

    function verTarea(uint256 _indice)
        public
        view
        indiceValido(_indice)
        returns (
            string memory,
            bool,
            address,
            uint256,
            address,
            bool
        )
    {
        Tarea storage t = tareas[_indice];

        return (
            t.descripcion,
            t.completada,
            t.creador,
            t.recompensa,
            t.completadaPor,
            t.cancelada
        );
    }

    function totalTareas() public view returns (uint256) {
        return tareas.length;
    }

    function tareasDe(address _usuario)
        public
        view
        returns (uint256[] memory)
    {
        return tareasPorCreador[_usuario];
    }

    function contarPendientes() public view returns (uint256) {
        uint256 contador = 0;

        for (uint256 i = 0; i < tareas.length; i++) {
            if (!tareas[i].completada && !tareas[i].cancelada) {
                contador++;
            }
        }

        return contador;
    }

    function recompensaEnJuego() public view returns (uint256) {
        uint256 total = 0;

        for (uint256 i = 0; i < tareas.length; i++) {
            if (!tareas[i].completada && !tareas[i].cancelada) {
                total += tareas[i].recompensa;
            }
        }

        return total;
    }
}
