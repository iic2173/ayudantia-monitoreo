# ayudantia-monitoreo

## Setup

Agregar los valores en el `.env` según lo que sale en `.env.example`

Luego hacer `docker-compose build`

Finalmente correr la aplicación con `docker-compose up`.


## Conexión EC2 con New Relic

* Iniciar sesión en New Relic e ir a la pestaña de `Infrastructure < AWS`.
* En la consola de AWS hay que crear un rol IAM de la forma:
    * Sea AWS Account
    * Apretar en Another AWS Account
    * `Account ID` debe ser `754728514883`
    * Check el `Require external ID`
    * En `External ID` hay que poner el ID de la cuenta de New Relic que se encuentra en `Administration > Access management > Accounts`
    * No habilitar el `Require MFA`
* Agregar la política `ReadOnlyAccess`
* Para el Role Name hay que poner `NewRelicInfrastructure-Integrations` y crear el rol.
* Seleccionar el rol recién creado y copiar su `Rol ARN`
* Crearle un Inline policy con la política en formato JSON:

    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
            "Effect": "Allow",
            "Action": ["budgets:ViewBudget"],
            "Resource": "*"
            }
        ]
    }
    ```

* Crearla, ponerle el nombre `NewRelicBudget`.
* Copiar el ARN en la sección de AWS de New Relic.
* Seleccionar los servicios de AWS a monitorear.
* Listo!