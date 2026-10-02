from eth_account import Account
from eth_keys import keys


def ocultar_clave(clave: str) -> str:
    """Oculta la parte central de una clave sensible para usarla en capturas."""
    return f"{clave[:10]}...{clave[-8:]}"


def main() -> None:
    cuenta = Account.create()

    clave_privada = cuenta.key.hex()
    address = cuenta.address

    clave_privada_obj = keys.PrivateKey(cuenta.key)
    clave_publica_comprimida = clave_privada_obj.public_key.to_compressed_bytes().hex()
    clave_publica_no_comprimida = clave_privada_obj.public_key.to_bytes().hex()

    direccion_verificada = Account.from_key(clave_privada).address

    print("=== Generador de cuenta Ethereum (EOA) ===\n")

    print("Clave privada (parcialmente oculta):")
    print(ocultar_clave(clave_privada))

    #print("CLAVE PRIVADA COMPLETA (NO COMPARTIR):", clave_privada)

    print("\nClave pública comprimida:")
    print(f"0x{clave_publica_comprimida}")

    print("\nClave pública no comprimida:")
    print(f"0x{clave_publica_no_comprimida}")

    print("\nDirección EOA Ethereum:")
    print(address)

    print("\nVerificación:")
    if address == direccion_verificada:
        print("Correcta: la dirección coincide con la derivada desde la clave privada.")
    else:
        print("Error: las direcciones no coinciden.")

    print("\nADVERTENCIA DE SEGURIDAD:")
    print("La clave privada real no se imprime completa para evitar exponerla.")


if __name__ == "__main__":
    main()