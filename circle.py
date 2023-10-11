def circle_new(name, radius):
    circ_obj = {
        'name': name,
        'radius': radius,
        'perimeter': circle_perimeter,
        'area': circle_area
    }
    return circ_obj

def circle_parameter(instance):
    return 2*instance['radius']*3.14

def circle_area(instance):
    return radius ** 2 * 3.14

def call(instance, method):
    return instance['method'](instance)

s = circle_new(ss,3)
call(s,'perimeter')