from fastapi import FastAPI# type: ignore
app = FastAPI()

@app.get("/")
def home():
    return 'Hello, astapi!'


biosamples :list[int] = [222,141,213,244] 
region_ids :list[int] = [1,2,3,4,5]
Area :list[int] = [0.5,1,1.5,2,2.5,3,3.5]

@app.get('/get_biosamples')
def get_biosamples():
    return biosamples

@app.get('/get_region_ids')
def get_region_ids():
    return region_ids       

@app.get('/get_Area')
def get_Area():
    return Area 

