import Vue from 'vue';

function retry(request) {
  const method = request.method.toLowerCase();
  return Vue.http[method](request.url, {
    headers: {
      Authorization: `Bearer ${localStorage.accessToken}`,
    },
  });
}

export function handleToken(request, next) {
  if (localStorage.accessToken) {
    request.headers.set('Authorization', `Bearer ${localStorage.accessToken}`);
  }

  next();
}

export function handleError(request, next) {
  next((response) => {
    if (response.status !== 401 || !localStorage.refreshToken) {
      return false;
    }

    function retrie(res) {
      localStorage.setItem('accessToken', res.body.access_token);
      localStorage.setItem('refreshToken', res.body.refresh_token);
      return retry(request);
    }

    return Vue.http.get(`/token?refresh_token=${localStorage.refreshToken}&grant_type=refresh_token`)
      .then(retrie)
      .catch(() => {
        Vue.router.push('/login');
      });
  });
}
