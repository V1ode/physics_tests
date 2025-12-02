<script>
    export default {
        methods: {
            goHome() {
                this.$router.push({
                    name: 'home'
                })
            },  
        }
    }
</script>

<template>
    <nav class="navbar">
        <div class="logo-container" @click="goHome">
            <img src="/src/assets/MainLogo.png" alt="">
        </div>

        <button class="login-btn">Войти</button>
    </nav>
</template>

<style>
    .navbar {
        height: 170px;
        box-shadow: 0 4px 20px 1px rgba(0, 0, 0, .5);

        background-color: rgb(226, 226, 248);

        padding: 60px 55px;

        display: flex;
        justify-content: space-between;
        align-items: center;        
    }

    .logo-container {
        width: 13vw;
        height: 13vh;

        transition: all ease .4s;
    }

    .logo-container:hover {
        cursor: pointer;
        transform: scale3d(1.1, 1.1, 1);
        transition: all ease .4s;
    }

    .logo-container img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .login-btn {
        height: fit-content;
        font-size: 20px;
        font-weight: 600;        
        color: rgb(28 28 255 / 67%);

        background-color: rgba(197, 197, 248, 0.25);
        border-color: #0000ff7a;
        border-radius: 16px;

        padding: 15px 30px;

        margin-right: 10vw;

        transition: all ease .4s;
    }

    .login-btn:hover {
        color: rgba(33, 33, 255, 0.781);

        background-color: rgba(154, 154, 255, 0.644);
        border-color: #0202ffa4;

        cursor: pointer;
        transition: all ease .4s;
    }
</style>