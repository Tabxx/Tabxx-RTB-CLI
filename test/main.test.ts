import main from '../src/main'

test('should get "Hello RTB CLI!123"', () => {
  expect(main).toBe('Hello RTB CLI!123') // 测试成功
})
