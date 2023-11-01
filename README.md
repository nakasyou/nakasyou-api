# nakasyou-api
nakasyouの14歳誕生日記念で、nakasyouのAPIです！！

## Endpoint
https://nakasyou-api.deno.dev
## Usage
### プロフィール GET `/profile`
https://nakasyou-api.deno.dev/profile

プロフィールを取得します。

### 機嫌 GET `/mood`
https://nakasyou-api.deno.dev/mood

nakasyouの機嫌を取得します。

### 幸せか GET `/is-happy`
https://nakasyou-api.deno.dev/is-happy

nakasyouがいま幸せかを取得します。

### 睡眠時間 GET `/sleep-time/:date`
- Param: `date`: yyyy-mm-dd の形式で指定します

nakasyouの睡眠時間を取得します。
その日の寝た時間と起きた時間を取得できます。
睡眠時間は、その日の前日からその日の朝です。

## Todo
- [ ] GraphQL対応
- [ ] 情報更新をもっとやりやすく
