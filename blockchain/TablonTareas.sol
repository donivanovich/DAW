// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TablonTareas {

    struct Tarea {
        string descripcion;
        bool completada;
        address creador;
        uint256 recompensa;
        address completadaPor;
    }

    Tarea[] private tareas;

    mapping(address => uint256[]) private tareasPorCreador;
    mapping(address => uint256) public recompensaGanada;
    mapping(uint256 => bool) private tareasCanceladas;

    event TareaCreada(
        uint256 indexed indice,
        address indexed creador,
        string descripcion,
        uint256 recompensa
    );

    event TareaCompletada(
        uint256 indexed indice,
        address indexed completadaPor,
        uint256 recompensa
    );

    event TareaCancelada(
        uint256 indexed indice,
        address indexed creador,
        uint256 recompensaDevuelta
    );

    function crearTarea(string memory _descripcion) public payable {
        uint256 indice = tareas.length;

        tareas.push(
            Tarea(
                _descripcion,
                false,
                msg.sender,
                msg.value,
                address(0)
            )
        );

        tareasPorCreador[msg.sender].push(indice);

        emit TareaCreada(
            indice,
            msg.sender,
            _descripcion,
            msg.value
        );
    }

    function completar(uint256 _indice) public {
        require(_valido(_indice), "Indice invalido");
        require(!tareasCanceladas[_indice], "Tarea cancelada");

        Tarea storage t = tareas[_indice];

        require(!t.completada, "Tarea ya completada");
        require(msg.sender != t.creador, "No puedes completar tu tarea");

        uint256 pago = t.recompensa;

        t.completada = true;
        t.completadaPor = msg.sender;

        if (pago > 0) {
            recompensaGanada[msg.sender] += pago;

            (bool exito, ) = payable(msg.sender).call{value: pago}("");
            require(exito, "Error al enviar recompensa");
        }

        emit TareaCompletada(_indice, msg.sender, pago);
    }

    function cancelar(uint256 _indice) public {
        require(_valido(_indice), "Indice invalido");
        require(!tareasCanceladas[_indice], "Tarea ya cancelada");

        Tarea storage t = tareas[_indice];

        require(msg.sender == t.creador, "No eres el creador");
        require(!t.completada, "Tarea ya completada");

        uint256 devolucion = t.recompensa;

        tareasCanceladas[_indice] = true;

        if (devolucion > 0) {
            (bool exito, ) = payable(t.creador).call{value: devolucion}("");
            require(exito, "Error al devolver recompensa");
        }

        emit TareaCancelada(_indice, t.creador, devolucion);
    }

    function verTarea(uint256 _indice)
        public
        view
        returns (
            string memory,
            bool,
            address,
            uint256,
            address
        )
    {
        require(_valido(_indice), "Indice invalido");

        Tarea storage t = tareas[_indice];

        return (
            t.descripcion,
            t.completada,
            t.creador,
            t.recompensa,
            t.completadaPor
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
            if (!tareas[i].completada && !tareasCanceladas[i]) {
                contador++;
            }
        }

        return contador;
    }

    function recompensaEnJuego() public view returns (uint256) {
        uint256 total = 0;

        for (uint256 i = 0; i < tareas.length; i++) {
            if (!tareas[i].completada && !tareasCanceladas[i]) {
                total += tareas[i].recompensa;
            }
        }

        return total;
    }

    function _valido(uint256 _indice) private view returns (bool) {
        return _indice < tareas.length;
    }
}
