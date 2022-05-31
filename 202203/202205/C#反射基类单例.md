
# 反射单例

## 背景

C#代码中涉及到存储窗体位置，并在下一次打开软件的时候，自动展示上一次保存的窗体及位置

## 实现逻辑

窗体在软件中使用单例模式，为了方便编码，因此写了单例基类

### 单例基类

``` code
public abstract class SingletonWindowBase<T> where T : Window, new()
    {
        private static T _instance;

        private readonly static object _obj = new object();

        /// <summary>
        /// 实例个数
        /// </summary>
        private static int _instanceNum = 0;

        public static T Instance
        {
            get
            {
                return GetInstance();
            }
        }

        public static T GetInstance() 
        {
            if (_instance == null)
            {
                //线程锁，线程安全
                lock (_obj)
                {
                    if (_instance == null)
                    {
                        _instance = new T();
                    }
                }
            }
            return _instance;
        }

        protected SingletonWindowBase()
        {
            _instanceNum++;
            if (_instanceNum > 1)
            {
                throw new Exception(string.Format("SingletonWindowBase类型{0}实例拥有多个", _instance));
            }
        }

        public static void Dispose()
        {
            _instance = null;
        }
    }
```

### 反射

反射时，能够根据窗体/类名获取到其拥有的方法，但其方法中并没有包含单例基类的方法

```code
Type type = Assembly.GetExecutingAssembly().GetType("类的全域名称");
MethodInfo mi = type.GetMethod("GetInstance"); //==>返回null
```

因此，需要修改获取方法，通过其基类来获取，此时即可以取到要使用到的GetInstance方法

```code
Type type = Assembly.GetExecutingAssembly().GetType("类的全域名称");
MethodInfo mi = type.BaseType.GetMethod("GetInstance");
var obj = mi.Invoke(null, null);
```

### 对比

使用要反射获取的单例类的实例与通过反射方法获取的实例进行比对

```code
return obj.Equals(类名.Instance);   //==>返回true
```
