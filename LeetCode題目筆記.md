# LeetCode 題目筆記

## Stack
### 856. Score of Parentheses
<span style="font-size: 20px; font-weight: bold;">題目</span>
給定一個平衡的括號字串 `s`，返回字串的分數。
1. `"()"` 的分數為 1。
2. `AB` 的分數為 `A + B`，其中 `A` 和 `B` 是平衡的括號字串。
3. `"(A)"` 的分數為 `2 * A`，其中 `A` 是平衡的括號字串。
<span style="font-size: 20px; font-weight: bold;">解法</span>
輸入:"(()(()))"
- 依序將'('放入stack
- 若遇到')'則開始pop
- 紀錄pop出來的數字直到pop出的是'('
- 將pop出來的數字相加放入stack，若沒有數字則push(1)
- 最後將stack內的數字加總
***
### 1209. Remove All Adjacent Duplicates in String II
<span style="font-size: 20px; font-weight: bold;">題目</span>
給定字串 s 和整數 k，每次可以移除 s 中相鄰且相同的 k 個字元，移除後會將左右兩邊的字串連接起來。
重複上述操作直到無法再進行移除，最後返回處理後的字串。答案保證是唯一的。
<span style="font-size: 20px; font-weight: bold;">解法</span>
* 先把字串內字元放入堆疊st1
* st1字元依序pop到st2並記錄次數
* 若連續出現k次則把st2的字元pop出k次，刪除重複字元
* st2再pop k-1次並push到st1內，避免後續會有k個連續無法被檢查到
* 持續上述步驟直到st1為空
* 將st2的字元組合成字串並反轉即為答案
***
## String

## 408. Valid Word Abbreviation
<span style="font-size: 20px; font-weight: bold;">題目</span>
字串可被替換為數字與字母的組合
例如:"s10n" ("s ubstitutio n")
檢查替換是否符合規則
Example 1:
Input: word = "internationalization", abbr = "i12iz4n"
Output: true

<span style="font-size: 20px; font-weight: bold;">解法</span>
* 依序檢查abbr,若為字母則檢查和word首字是否相等，若相等則刪除word[0]
* 若為數字則先放入暫存，等又是字母時將word刪除暫存數量的字母數
* 最後若word為空則表示true
***

### 553. Optimal Division
<span style="font-size: 20px; font-weight: bold;">題目</span>
給你一個整數陣列nums = [2,3,4]，我們將計算表達式"2/3/4"。
可在任何位置新增任意數量的括號來變更運算的優先權。求表達式的值達到最大值。
輸入： nums = [1000,100,10,2]
輸出： "1000/(100/10/2)"
<span style="font-size: 20px; font-weight: bold;">解法</span>
* 分母最小則運算值最大
* 因此答案固定將括號放在分子的部分
***

### 893. Groups of Special-Equivalent Strings
<span style="font-size: 20px; font-weight: bold;">題目</span>
可以交換字串中任意兩個偶數索引字元或任意兩個奇數索引字元。
如果經過任意次數的移動讓words[i] == words[j]，則words[i]和words[j]是特殊等價的兩個字串。
傳回特殊等效字串組的數量
輸入：words = ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]
輸出：3
<span style="font-size: 20px; font-weight: bold;">解法</span>
* 取奇數、偶數索引的字元各自排列
* 組合起來取代源字元
* 用set()看不同的字串有幾種
***
### 791. Custom Sort String
<span style="font-size: 20px; font-weight: bold;">題目</span>
給兩個字串order和s，s需照order的順序排，沒在order內的字元則可以出現在任意位置
Example 1:
Input: order = "cba", s = "abcd"
Output: "cbad"
<span style="font-size: 20px; font-weight: bold;">解法</span>
* unordered_map紀錄s中有出現在order的次數。vector存沒在order的字元
* 依照unordered_map紀錄的結果來生成輸出字串
* 將沒出現的依序放到後面
***











 