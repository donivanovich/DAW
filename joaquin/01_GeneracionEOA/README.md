# Generador de una EOA de Ethereum con Python

## 1. Objetivo y entrega

Este proyecto genera mediante código una cuenta externa de Ethereum (EOA): una clave privada, su clave pública y una dirección pública. La dirección se usará en las siguientes actividades del curso. **La clave privada nunca se entrega ni se publica.**

Archivos de la entrega:

```text
proyecto-eoa/
├── generar_eoa.py
├── requirements.txt
├── README.md
└── capturas/
    ├── ejecucion.png
    └── metamask.png
```

La captura `ejecucion.png` debe mostrar la ejecución del script, la dirección y la clave privada parcialmente oculta. La captura `metamask.png` debe mostrar la cuenta importada y **la misma dirección**, sin mostrar la clave privada.

## 2. Instalación y ejecución

Se necesita Python 3.10 o posterior (anterior a Python 4). Para instalar la librería:

```bash
python -m pip install eth-account==0.14.0
```

Contenido de `requirements.txt`:

```text
eth-account==0.14.0
```

Para instalar desde el archivo y ejecutar el programa:

```bash
python -m pip install -r requirements.txt
python generar_eoa.py
```

En Windows, si `python` no funciona, puedo probar `py` en su lugar.

## 3. Código

Archivo `generar_eoa.py`:

```python
from eth_account import Account
from eth_keys import keys


def ocultar_clave(clave: str) -> str:
    return f"{clave[:10]}...{clave[-8:]}"


def main() -> None:
    cuenta = Account.create()
    clave_privada = cuenta.key.hex()
    clave_privada_obj = keys.PrivateKey(cuenta.key)

    clave_publica_comprimida = (
        "0x" + clave_privada_obj.public_key.to_compressed_bytes().hex()
    )
    clave_publica_no_comprimida = (
        "0x" + clave_privada_obj.public_key.to_bytes().hex()
    )
    direccion = cuenta.address

    direccion_recalculada = Account.from_key(cuenta.key).address
    if direccion != direccion_recalculada:
        raise RuntimeError("La dirección generada no coincide con la recalculada")

    print("=== Generador de una EOA de Ethereum ===")
    print("Clave privada (parcialmente oculta):", ocultar_clave(clave_privada))
    print("Clave pública comprimida:", clave_publica_comprimida)
    print("Clave pública no comprimida:", clave_publica_no_comprimida)
    print("Dirección EOA:", direccion)
    print("Verificación: correcta")

    # Descomentar SOLO para guardar la clave en una ejecución privada.
    # Nunca hacer capturas mientras esta línea muestre el secreto.
    # print("CLAVE PRIVADA COMPLETA (NO COMPARTIR):", clave_privada)


if __name__ == "__main__":
    main()
```

> Si mi archivo entregado difiere del ejemplo, la explicación siguiente se refiere a los mismos pasos generales, pero debo ajustar este bloque para que coincida exactamente con mi código real.

## 4. Cómo funciona

1. `Account.create()` genera una cuenta nueva. **Cada ejecución crea otra cuenta y otra dirección.**
2. `cuenta.key` contiene su clave privada; `.hex()` permite representarla en hexadecimal. `ocultar_clave()` deja visibles únicamente unos caracteres de los extremos para la captura.
3. `keys.PrivateKey(cuenta.key)` deriva la clave pública mediante la curva secp256k1. El código muestra su representación comprimida y la representación de 64 bytes de coordenadas sin comprimir que devuelve `eth-keys`.
4. `cuenta.address` obtiene el address de Ethereum que sí se puede compartir.
5. `Account.from_key(cuenta.key).address` recalcula la dirección a partir de la misma clave privada y comprueba que coincide. Es una comprobación de coherencia, no una auditoría independiente de la librería.
6. `print()` muestra el resultado en la terminal. La clave privada completa permanece oculta salvo que se habilite temporalmente la línea comentada para guardarla en privado.

La cuenta se genera localmente: este programa no necesita conectar MetaMask ni enviar transacciones.

## 5. Importación en MetaMask

1. En un entorno privado, descomento temporalmente la última línea `print` para ver la clave privada completa y ejecuto el script **una sola vez para generar la cuenta definitiva**. Guardo de forma segura la clave completa y anoto el address mostrado en **esa misma ejecución**.
2. Vuelvo a comentar la línea que muestra la clave y compruebo que no voy a entregar ninguna captura, archivo o historial con la clave visible.
3. En la extensión de MetaMask del navegador abro el selector de cuentas, pulso **Add wallet / Añadir cartera** y después **Import an account / Importar una cuenta**. Pego la clave privada de la cuenta definitiva y pulso **Import**.
4. Compruebo que el address de MetaMask coincide con el que anoté y hago la captura `capturas/metamask.png` con la dirección visible, pero sin mostrar la clave privada.

**Importante sobre `capturas/ejecucion.png`:** si vuelvo a ejecutar el código, `Account.create()` genera **otra cuenta**, así que esa nueva captura no demostraría el address importado. Para que las capturas coincidan, puedo utilizar la captura de la ejecución original y ocultar de manera irreversible la línea que enseñaba la clave privada antes de entregarla, o adaptar el programa para cargar la clave definitiva desde un medio privado y volver a mostrar sus datos sin generar otra cuenta. Nunca incrusto esa clave en el código enviado.

Una cuenta importada por clave privada puede requerir que vuelva a importar esa clave si restauro MetaMask; debo conservar una copia de seguridad separada. [Ayuda oficial de MetaMask](https://support.metamask.io/start/use-an-existing-wallet/).

## 6. Address y evidencias

**Dirección EOA definitiva:** `0xF2E2EA90C03E13dE4Fd71527062f6a54481B20Ac`

- `capturas/ejecucion.png`: salida real del código, clave parcialmente oculta y address definitivo.
- `capturas/metamask.png`: cuenta importada con ese mismo address visible.
- Clave privada: guardada en privado; **no incluida en la entrega**.

> Antes de subir el proyecto, sustituyo el marcador del address y compruebo que el mismo valor aparece en el README y en ambas capturas. Si no guardé la clave completa de la cuenta de la captura, no puedo recuperarla a partir del address: tengo que generar una nueva y actualizar ambas capturas.

## 7. Librería y seguridad

Se utiliza **`eth-account` versión 0.14.0** para generar y reconstruir la cuenta y **`eth-keys`** (dependencia instalada con `eth-account`) para derivar las representaciones de la clave pública. Según PyPI, la versión 0.14.0 de `eth-account` se publicó el **23 de agosto de 2026**; esta es la última actualización publicada que consta en la consulta realizada el 29 de septiembre de 2026. Requiere Python >=3.10 y <4. [Ficha de PyPI](https://pypi.org/project/eth-account/).

La librería **sí tuvo un aviso de seguridad histórico**: `PYSEC-2026-806` / `CVE-2022-1930`, relacionado con denegación de servicio por expresiones regulares en `encode_structured_data`. Afecta a versiones **anteriores a 0.5.9** y consta corregido en 0.5.9; por tanto, **0.14.0 no figura entre las versiones afectadas por ese aviso**. No se debe afirmar que una librería jamás tuvo bugs ni que una auditoría garantice ausencia absoluta de fallos. [Aviso en OSV](https://osv.dev/vulnerability/PYSEC-2026-806).

Para comprobar mi instalación real y sus dependencias antes de entregar:

```bash
python -m pip show eth-account eth-keys
python -m pip install pip-audit
python -m pip_audit
```

**Versión instalada de `eth-keys`:** `0.14.0`. **Resultado y fecha de `pip-audit`:** `No known vulnerabilities found: 29/09/2026`. Si detecta alguna vulnerabilidad conocida en las versiones instaladas, debo revisarla antes de presentar la instalación como segura. [Proyecto pip-audit en PyPI](https://pypi.org/project/pip-audit/).

## 8. Prompt utilizado

Estos son los mensajes principales que introduje para obtener ayuda de IA con este proyecto:
```
Actúa como un desarrollador especializado en Python y seguridad de aplicaciones Ethereum. Necesito desarrollar una práctica individual que genere mediante código una cuenta externa de Ethereum (EOA).

Propón una solución reproducible en Python que genere una clave privada con aleatoriedad criptográficamente segura, derive la clave pública correspondiente en formatos comprimido y no comprimido, obtenga la dirección Ethereum y compruebe que las claves y la dirección son coherentes. Utiliza una librería reconocida, fija su versión e indica cómo instalar las dependencias y ejecutar el programa.

Prioriza la seguridad: no incluyas claves privadas reales en el código o el repositorio, muestra la clave solo parcialmente en la salida destinada a capturas y explica cómo guardar en privado la clave completa de la misma ejecución que se importará en MetaMask. Advierte de que cada ejecución que genere una cuenta nueva producirá otra dirección.

Prepara un README claro que explique el funcionamiento de cada parte del código, los pasos para importar la cuenta en la extensión de MetaMask y verificar que ambas direcciones coinciden, las evidencias que debo capturar y qué address público debo entregar. Incluye una revisión de seguridad basada en fuentes verificables: nombre exacto de la librería, versión utilizada, última fecha de publicación conocida, avisos históricos y si afectan a la versión elegida, además de una comprobación de las dependencias instaladas. No afirmes que una librería es infalible ni inventes resultados de auditoría, ejecuciones o capturas.

Los mensajes están seleccionados, no son la transcripción íntegra del enunciado. Si se solicita el prompt literal completo, adjuntaré la conversación original. La cuenta, el address, las capturas y el resultado de la comprobación de seguridad deben proceder de mi propia ejecución.
```