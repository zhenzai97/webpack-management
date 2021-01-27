
import reqwest from 'reqwest';
import {message, notification} from 'antd';
import {createBrowserHistory} from 'history'

const history = createBrowserHistory({forceRefresh: true});
let count = 0, hide;

function ajax(opts, errorCallback) {
  opts = opts ? opts : {};
  errorCallback = errorCallback || opts.error;
  let data = opts.data;
  const lastVisited = window.sessionStorage.getItem(`lastVisitTime-${opts.url}`);
  const lastQueryData = window.sessionStorage.getItem(`lastQueryData-${opts.url}`);
  const lastUrl = window.sessionStorage.getItem(`lastVisitedUrl`);
  if (lastUrl === opts.url && new Date().getTime() - Number(lastVisited) < 500 && JSON.stringify(opts.data) === lastQueryData) {
    console.error(`${opts.url}请求过于频繁，已限流`);
    return
  }
  window.sessionStorage.setItem(`lastVisitTime-${opts.url}`, new Date().getTime());
  window.sessionStorage.setItem(`lastQueryData-${opts.url}`, JSON.stringify(opts.data));
  window.sessionStorage.setItem('lastVisitedUrl', opts.url);
  if ((opts.method === 'post' || !opts.method) && typeof opts.data === 'object') {
    data = JSON.stringify(opts.data).replace(/"\s*　*/g, '"').replace(/\s*　*"/g, '"')
  }
  //登录报错
  // if (!opts.skipEmpty) {
  //   data = data.replace(/""/g, null);
  // }
  !opts.silent && showLoading();
  let url = opts.url.indexOf('?') === -1 ? opts.url + '?_=' + new Date().getTime() : opts.url + '&_=' + new Date().getTime;
  window.upDataRequestState && window.upDataRequestState(opts.url, 1);
  reqwest({
    url: url,
    type: opts.type ? opts.type : 'json',
    data: data,
    method: opts.method ? opts.method : 'post',
    crossOrigin: opts.crossOrigin ? opts.crossOrigin : false,
    // crossOrigin: true,
    processData: !opts.fileType,
    contentType: opts.contentType ? opts.contentType : 'application/json',
    headers: opts.headers ? opts.headers : '',
    success: function (result) {
      !opts.silent && hideLoading();
      if (result.status === 1) {
        if (opts.success) {
          //message.success('操作成功')
          let JSONString = JSON.stringify(result.data);
          //去除所有null
          JSONString = JSONString.replace(/:null/g, ':""').replace(/0000-00-00 00:00:00/g, '');
          // 将所有4位小数置为2位小鼠
          JSONString = JSONString.replace(/"-?\d+\.\d\d0{2,}"/g, str => str.slice(0, str.indexOf('.') + 3) + '"');
          JSONString = JSONString.replace(/"-?\d+\.\d\d\d0+"/g, str => str.slice(0, str.indexOf('.') + 4) + '"');

          opts.success(JSON.parse(JSONString));
        }
      } else {
        console.log(opts.url, result);
        if (errorCallback) {
          errorCallback(result);
          return;
        }
        notification.warning({
          key: "message",
          message: '操作失败',
          description: result.msg,
          duration: 5,
        })
      }
      window.upDataRequestState && window.upDataRequestState(opts.url, 0);
    },
    error: function (result) {
      console.log(result);
      !opts.silent && hideLoading();
      if (errorCallback) {
        errorCallback(result);
        return;
      }

      window.errorStatus = window.errorStatus || {};
      if (window.errorStatus[result.status]) {
        //如果已经有该状态的错误提示，则不进行多次提示
        return
      } else {
        window.errorStatus[result.status] = true;
      }

      if (result.status === 0) {
        notification.error({
          message: '连接超时',
          description: '远程服务器已停止运行，或者连接超时',
          onClose: () => {
            window.errorStatus[result.status] = false;
          }
        });
      } else if (result.status === 400) {
        notification.error({
          message: '参数错误',
          description: '请求参数出错，请验证后重新请求。',
          onClose: () => {
            window.errorStatus[result.status] = false;
          }
        });
      } else if (result.status === 401) {
        notification.error({
          message: '登录超时',
          description: '未登录或者登录信息已过期，需要重新登录后才能继续操作',
          onClose: () => {
            window.errorStatus[result.status] = false;
          }
        });
        // 3333hashHistory.push('/login')
        setTimeout(() => {
          history.push('/login')
        }, 500)

        // unlisten()
        //this.props.history.location.push('/login')
      } else if (result.status === 403) {
        notification.error({
          message: '权限验证失败',
          description: '当前角色没有该功能的权限，请联系管理员进行配置',
          onClose: () => {
            window.errorStatus[result.status] = false;
          }
        });
      } else if (result.status === 404) {
        notification.error({
          message: '404找不到指定接口',
          description: '找不到所请求的接口（' + opts.url + '），请验证后再重试',
          onClose: () => {
            window.errorStatus[result.status] = false;
          }
        });
      } else if (result.status === 500) {
        //TODO 这里可以考虑加一个收集信息，将报错的信息返回服务器
        notification.error({
          message: '系统异常！',
          description: '内部服务器发生异常！',
          onClose: () => {
            window.errorStatus[result.status] = false;
          }
        });
      } else {
        notification.error({
          message: `系统错误，错误代码：${result.status}`,
          description: `${result.statusText}。`,
          onClose: () => {
            window.errorStatus[result.status] = false;
          }
        });
      }
      window.upDataRequestState && window.upDataRequestState(opts.url, 0);
    },
    complete: opts.complete
  })
}

function showLoading() {
  if (count === 0) {
    hide = message.loading('正在执行中...', 0);
  }
  count++;
}

function hideLoading() {
  if (count >= 1) {
    hide()
  }
  setTimeout(() => {
    count--;
  }, 1000)
}

export default ajax;
