//pageId 要调入内存的页面号
//currentPoint 记录当前将要调入内存中页面所在页面队列中的下标号
void OPT::replace(int pageId, int currentPoint)
{
    //cur为内存块下标,searchCounter纪录是否内存块搜索完毕
    //循环爆出最长为使用的页面
    int max = 0, perCount, outPageId = -1, cur = 0;
    int search_count[PRO_MEMORY];

    for (int i = 0; i < PRO_MEMORY; i++)
    {
    //比如，从页面2后面的页面开始扫描记录页面7、0、1再次被访问的数组的下标号
        for (int j = currentPoint + 1; j < length; j++)
        {
            if (pages_OPT[i].getId() == usePageNumList_OPT[j])
            {
                search_count[i] = j;
                break;
            }
        }
        if (search_count[i] == 0)
        {
            search_count[i] = length;
        }
    }
    //以上面内存中存在的是页面7、0、1为例。寻找页面7、0、1再次被访问的下标号最大的    //哪个页面
    for (int k = 0; k < PRO_MEMORY; ++k)
    {
        perCount = search_count[k];
        if (max < perCount)
        {
            max = perCount;
            cur = k;
        }
    }

    outPageId = pages_OPT[cur].getId();

    pages_OPT[cur].setId(pageId);
    cout << "页号ID：" << pageId << "正在放入内存，页号ID：" << outPageId << "被替换出去" << endl;
    ofs_OPT << "页号ID：" << pageId << "正在放入内存，页号ID：" << outPageId << "被替换出去\n";
}
