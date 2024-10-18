describe ('API tests', () => {
    const APIUrl = 'https://httpbin.org';

    //1. Test z wykorzystaniem metody GET
    it('should send a GET request', () => {
        cy.request('GET', 'https://httpbin.org/get')
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.url).to.eq('https://httpbin.org/get');
          });
    });
    // 2. Test z wykorzystaniem metody POST
    it('should send a POST request', () => {
        cy.request({
          method: 'POST',
          url: 'https://httpbin.org/post',
          body: { name: 'John Doe', age: 30 },
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.json).to.deep.equal({ name: 'John Doe', age: 30 });
        });
      });
      // 3. Test z wykorzystaniem metody PUT
      it('should send a PUT request', () => {
        cy.request({
            method: 'PUT',
            url: 'https://httpbin.org/put',
            body: { update: 'new data' },
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.json).to.deep.equal({ update: 'new data' }); 
      })
});
// 4. Test z wykorzystaniem metody DELETE
it('should send a DELETE request', () => {
    cy.request({
        method: 'DELETE', 
        url: 'https://httpbin.org/delete'
    }).then((response) => {
        expect(response.status).to.eq(200);
      });
  });
// 5. Test z wykorzystaniem metody PATCH
it('should send a PATCH request', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://httpbin.org/patch',
      body: { patch: 'partial update' },
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.equal({ patch: 'partial update' });
    });
});
// 6. Sprawdzanie nagłówków User-Agent
it('Check standard User-Agent header', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers).to.have.property('User-Agent');
    });
  });
  //7. Niestandardowe nagłówków
  it('GET request with custom headers', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get',
      headers: {
        'Custom-Header': 'CustomValue'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers).to.have.property('Custom-Header', 'CustomValue');
    });
  });
  //8. Wysyłanie losowych parametrów zapytania
  it('GET request with random query parameters', () => {
    const randomValue = Math.random().toString(36).substring(5);
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get',
      qs: {
        random: randomValue
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args).to.have.property('random', randomValue);
    });
  });
  //9. Spradzanie treści odpowiedzi
  it('Check response body content', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('url', 'https://httpbin.org/get');
    });
  });
  //10. Czas odpowiedzi
  it('Check response time', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get',
    }).then((response) => {
      expect(response.duration).to.be.lessThan(1000);
    });
  });
})