import { inicializaInfra } from '../../infra/init-infra.js'
import { verificaGinvestToken } from '../../infra/servicos/token.js'

async function main() {
    try {
        await inicializaInfra()
    } catch (e) {
        console.log(`Erro ao Inicializar Sistema - ${e}`)
        return
    }

    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNGIxM2E0YS00M2EyLTQ1ZGQtYTc0OC1kMDQxNzAxMjkxZmEiLCJhdWQiOiJnaW52ZXN0IiwiZXhwIjoxNjE5NDU1MDk5MTI3LCJpYXQiOjE2MTk0NDc4OTl9.3R2w55m0NcIEh0CN2CFRx2DxF_HDgcXPtOp6scy9NmM'

    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNGIxM2E0YS00M2EyLTQ1ZGQtYTc0OC1kMDQxNzAxMjkxZmEiLCJhdWQiOiJnaW52ZXN0IiwiZXhwIjoxNjE5NTU1NDMyOTE1LCJpYXQiOjE2MTk1NDgyMzJ9.AruJDWAGwrYgaXtLm6_NFwFz0aJ5eVFj3CLyXFunQbM"

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNGIxM2E0YS00M2EyLTQ1ZGQtYTc0OC1kMDQxNzAxMjkxZmEiLCJhdWQiOiJnaW52ZXN0IiwiZXhwIjoxNjE5NjI1Njc0MTAzLCJpYXQiOjE2MTk2MTg0NzR9.2jL0xD72yQc0Ym7S795wAzyq6ddncCbbmSLs7JkUPao"

    const decoded = verificaGinvestToken(token)
    console.log('Resultado da VERIFICAÇÃO do token')
    console.log(decoded)

}

main()