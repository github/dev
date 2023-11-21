#Produced by Furkan E Yigit
import pygame
import random

# Oyunun başlangıç ayarları
pygame.init()
genislik, yukseklik = 800, 600
ekran = pygame.display.set_mode((genislik, yukseklik))
pygame.display.set_caption("Yılan Oyunu")

# Renkler
siyah = (0, 0, 0)
beyaz = (255, 255, 255)
kirmizi = (255, 0, 0)

# Yılanın başlangıç konumu ve hareketi
yilan = [(genislik // 2, yukseklik // 2)]
yilan_hizi = (0, 0)

# Yem konumu
yem = (random.randint(0, genislik-20), random.randint(0, yukseklik-20))

# Oyun döngüsü
oyun_devam = True
while oyun_devam:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            oyun_devam = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                yilan_hizi = (0, -20)
            if event.key == pygame.K_DOWN:
                yilan_hizi = (0, 20)
            if event.key == pygame.K_LEFT:
                yilan_hizi = (-20, 0)
            if event.key == pygame.K_RIGHT:
                yilan_hizi = (20, 0)

    yeni_bas = (yilan[0][0] + yilan_hizi[0], yilan[0][1] + yilan_hizi[1])

    # Yılanın sınırları kontrol et
    if yeni_bas[0] < 0 or yeni_bas[0] >= genislik or yeni_bas[1] < 0 or yeni_bas[1] >= yukseklik:
        oyun_devam = False

    # Yemi yedi mi kontrol et
    if yeni_bas[0] < yem[0] + 20 and yeni_bas[0] + 20 > yem[0] and yeni_bas[1] < yem[1] + 20 and yeni_bas[1] + 20 > yem[1]:
        yem = (random.randint(0, genislik-20), random.randint(0, yukseklik-20))
    else:
        yilan.pop()

    yilan.insert(0, yeni_bas)

    # Ekranı temizle
    ekran.fill(siyah)

    # Yemi çiz
    pygame.draw.rect(ekran, kirmizi, (yem[0], yem[1], 20, 20))

    # Yılanı çiz
    for parca in yilan:
        pygame.draw.rect(ekran, beyaz, (parca[0], parca[1], 20, 20))

    pygame.display.update()
    pygame.time.delay(100)

pygame.quit()