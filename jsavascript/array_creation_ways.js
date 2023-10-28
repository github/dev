function A(n) {
    return [...new Array(n)].fill(0);
  }
  
  function B(n) {
    return new Array(n).fill(0);
  }
  
  function C(n) {
    return Array(n).fill(0);
  }
  
  function D(n) {
    return Array.from({length: n}, () => 0);
  }
  
  function E(n) {
    return [...new Array(n)].map(x => 0);
  }
  
  // arrays with type
  
  function F(n) {
    return Array.from(new Int32Array(n));
  }
  
  function G(n) {
    return Array.from(new Float32Array(n));
  }
  
  function H(n) {
    return Array.from(new Float64Array(n)); // needs 2x more memory than float32
  }
  
  function I(n) {
    return new Float32Array(n); // this is not typical array
  }
  
  function J(n) {
    return [].slice.apply(new Float32Array(n));
  }
  
  // Based on for
  
  function K(n) {
    let a = [];
    a.length = n;
    let i = 0;
    while (i < n) {
      a[i] = 0;
      i++;
    }
    return a;
  }
  
  function L(n) {
    let a=[]; for(let i=0; i<n; i++) a[i]=0;
    return a;
  }
  
  function M(n) {
    let a=[]; for(let i=0; i<n; i++) a.push(0);
    return a;
  }
  
  function N(n) {
    let a = new Array(n); for (let i=0; i<n; ++i) a[i] = 0;
    return a;
  }
  
  function O(n) {
    let a = new Array(n); for (let i=n; i--;) a[i] = 0;
    return a;
  }
  
  // other
  
  function P(n) {
    return Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
  }
  
  function Q(n) {
    return "0".repeat( n ).split("").map( parseFloat );
  }
  
  function R(n) {
    return new Array(n+1).join('0').split('').map(parseFloat)
  }
  
  // ---------
  // TEST
  // ---------
  [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R].forEach(f => {
    let a = f(10); 
    console.log(`${f.name} length=${a.length}, arr[0]=${a[0]}, arr[9]=${a[9]}`)
  });