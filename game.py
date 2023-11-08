import pygame

BACKGROUND_COLOR = (232,232,232) #窗口背景颜色

SCORE_TEXT_COLOR = (192.192.192) #分数字体颜色

TIP_TEXT_COLOR = (64,64,64) #提示文字颜色

class Label(object):
    font = None
    is_score = None
    
    def __init__(self , size = 48 , is_score = True):
        self.font = pygame.font.SysFont("simhei",size) #设置字体
        self.is_score = is_score #是否要绘制分数

    def draw(self,window,text):
        #1、用字体渲染文本内容
        color = SCORE_TEXT_COLOR if is_score else TIP_TEXT_COLOR #选择相应的颜色
        text_surface = self.font.render(text,True,color)
        #2、在游戏窗口绘制渲染结果
        window.blit(text_surface,(0,0))




class Food(object):
    pass

class Snake(object):
    pass