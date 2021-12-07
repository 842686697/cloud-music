const express = require('express')
const app = express()
const port = 3000

const { login_cellphone, user_cloud } = require('NeteaseCloudMusicApi');
async function main() {
    try {
        const result = await login_cellphone({
            phone: '13330221130',
            password: 'px13330221130',
        })
        console.log(result)
        const result2 = await user_cloud({
            cookie: result.body.cookie, // 凭证
        })
        console.log(result2.body)
    } catch (error) {
        console.log(error)
    }
}
main()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})