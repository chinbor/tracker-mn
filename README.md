# Tracker-mn

A tracker tool which is referenced from [zmy-tracker](https://blog.csdn.net/qq1195566313/article/details/125958100?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167994349616800184122264%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=167994349616800184122264&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-125958100-null-null.142^v76^insert_down38,201^v4^add_ask,239^v2^insert_chatgpt&utm_term=%E5%B0%8F%E6%BB%A1%E5%9F%8B%E7%82%B9&spm=1018.2226.3001.4187).

## Usage

```sh
pnpm i tracker-mn
```

```ts
import { Tracker } from 'tracker-mn'

const tracker = new Tracker({
  requestUrl: 'https://www.api.com'
})
```

## Options

* `uuid`: user's identifier
* `requestUrl`: api address
* `historyTracker`: open history router mode
* `hashTracker`: open hash router mode
* `domTracker`: watch `click`, `dbclick`, `click`, `dblclick`, `contextmenu`, `mousedown`, `mouseup`, `mouseenter`, `mouseout`, `mouseover`
* `sdkVersion`: version number
* `extra`: extra params you want to post
* `jsError`: catch error
  
## License

[MIT](https://github.com/chinbor/tracker-mn/blob/main/LICENSE) License © 2023 [chinbor](https://github.com/chinbor)
