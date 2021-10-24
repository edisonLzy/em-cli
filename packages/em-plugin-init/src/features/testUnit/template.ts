export const test = `
function sum(a:number,b:number){
    return a + b;
}
test('1+1',()=>{
    expect(sum(1,1)).toBe(2)
})
`;

export const babelConfig = `
module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript'
    ]
  }  
`;
